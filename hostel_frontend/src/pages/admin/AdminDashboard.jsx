import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import gsap from 'gsap';
import logo from '../../assets/logo.png';
import
{
  getAdminHostels, createHostel, updateHostel, deleteHostel,
  getContacts, deleteContact, uploadImage
} from '../../api/admin.api';

/* ─── tiny Toast helper ─── */
function Toast({toasts})
{
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`px-4 py-3 rounded-xl text-sm font-medium shadow-lg pointer-events-auto transition-all duration-300
            ${t.type==='success'? 'bg-green-600 text-white':'bg-red-600 text-white'}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ─── Image upload zone ─── */
function ImageUploader({images, setImages, token})
{
  const [uploading, setUploading]=useState(false);
  const [dragOver, setDragOver]=useState(false);
  const inputRef=useRef(null);

  const processFiles=async (files) =>
  {
    setUploading(true);
    for (const file of Array.from(files))
    {
      try
      {
        const data=await uploadImage(token, file);
        setImages(prev => [...prev, data.url]);
      } catch (e)
      {
        console.error('Upload failed', e);
      }
    }
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => {e.preventDefault(); setDragOver(true);}}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {e.preventDefault(); setDragOver(false); processFiles(e.dataTransfer.files);}}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors duration-200
          ${dragOver? 'border-[#0d1b2a] bg-[#0d1b2a]/10':'border-[#0d1b2a]/30 hover:border-[#0d1b2a]/60'}`}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => processFiles(e.target.files)} />
        {uploading? (
          <div className="flex items-center justify-center gap-2 text-[#0d1b2a]/70">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Uploading to Cloudinary…</span>
          </div>
        ):(
          <div>
            <svg className="w-8 h-8 mx-auto mb-2 text-[#0d1b2a]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-[#0d1b2a]/60">Drag & drop images here, or <span className="text-[#0d1b2a] font-semibold">click to browse</span></p>
            <p className="text-xs text-[#0d1b2a]/40 mt-1">JPG, PNG, WebP up to 10 MB each</p>
          </div>
        )}
      </div>

      {/* Preview thumbnails */}
      {images.length>0&&(
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-[#0d1b2a]/10">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImages(prev => prev.filter((_, idx) => idx!==i))}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Input + Label wrapper ─── */
const Field=({label, children}) => (
  <div>
    <label className="block text-[#0d1b2a] text-xs font-semibold uppercase tracking-wider mb-1.5">{label}</label>
    {children}
  </div>
);

const inputCls='w-full px-3 py-2.5 rounded-lg bg-white border-2 border-[#0d1b2a]/15 focus:border-[#0d1b2a] outline-none text-[#0d1b2a] text-sm transition-colors';
const selectCls=inputCls;

/* ─── Section heading inside form ─── */
const FormSection=({title}) => (
  <div className="flex items-center gap-3 pt-2">
    <span className="text-xs font-bold uppercase tracking-widest text-[#0d1b2a]/50">{title}</span>
    <div className="flex-1 h-px bg-[#0d1b2a]/10" />
  </div>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function AdminDashboard()
{
  const [hostels, setHostels]=useState([]);
  const [contacts, setContacts]=useState([]);
  const [activeTab, setActiveTab]=useState('hostels');
  const [loading, setLoading]=useState(true);
  const [showForm, setShowForm]=useState(false);
  const [editingHostel, setEditingHostel]=useState(null);
  const [sidebarOpen, setSidebarOpen]=useState(false);
  const [toasts, setToasts]=useState([]);
  const [formImages, setFormImages]=useState([]);
  const [submitting, setSubmitting]=useState(false);
  const navigate=useNavigate();
  const token=localStorage.getItem('adminToken');
  const mainRef=useRef(null);

  const blankForm={
    name: '', location: '', rating: '', price: '', gender: 'Co-ed', established: 2024,
    description: '', totalRemainingBeds: 0, capacity: 0, occupancy: 0, hostelType: 'Standard',
    popular: false, comming_soon: false, features: [], usps: [],
    nearby1: '', nearby1distance: '', nearby2: '', nearby2distance: '',
    nearby3: '', nearby3distance: '', locationLink: ''
  };
  const [formData, setFormData]=useState(blankForm);

  /* ── Toast helper ── */
  const addToast=(msg, type='success') =>
  {
    const id=Date.now();
    setToasts(prev => [...prev, {id, msg, type}]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id!==id)), 3500);
  };

  useEffect(() =>
  {
    if (!token) {navigate('/admin'); return;}
    fetchData();
  }, []);

  const fetchData=async () =>
  {
    setLoading(true);
    try
    {
      const [h, c]=await Promise.all([getAdminHostels(token), getContacts(token)]);
      setHostels(h);
      setContacts(c);
    } catch (err)
    {
      if (err.response?.status===401) {localStorage.removeItem('adminToken'); navigate('/admin');}
    }
    setLoading(false);
  };

  // ── GSAP Animations ──
  useEffect(() =>
  {
    if (!loading)
    {
      const ctx=gsap.context(() =>
      {
        // Sidebar items stagger
        gsap.from('.nav-item', {
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        });

        // Main content fade in
        gsap.from('.main-content-area', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out'
        });
      }, mainRef);
      return () => ctx.revert();
    }
  }, [loading]);

  useEffect(() =>
  {
    if (!loading&&activeTab)
    {
      const ctx=gsap.context(() =>
      {
        // Tab content stagger
        gsap.from('.stagger-item', {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }, mainRef);
      return () => ctx.revert();
    }
  }, [loading, activeTab]);

  useEffect(() =>
  {
    if (showForm)
    {
      gsap.fromTo('.form-modal-content',
        {x: '100%'},
        {x: '0%', duration: 0.5, ease: 'power3.out'}
      );
      gsap.fromTo('.form-modal-overlay',
        {opacity: 0},
        {opacity: 1, duration: 0.3}
      );
    }
  }, [showForm]);

  const handleInputChange=(e) =>
  {
    const {name, value, type, checked}=e.target;
    setFormData(prev => ({...prev, [name]: type==='checkbox'? checked:value}));
  };

  const handleArrayInput=(field, value) =>
  {
    setFormData(prev => ({...prev, [field]: value.split(',').map(s => s.trim()).filter(Boolean)}));
  };

  const openAdd=() =>
  {
    setEditingHostel(null);
    setFormData(blankForm);
    setFormImages([]);
    setShowForm(true);
  };

  const openEdit=(hostel) =>
  {
    setEditingHostel(hostel);
    setFormData(hostel);
    setFormImages(hostel.images||[]);
    setShowForm(true);
  };

  const handleSubmit=async (e) =>
  {
    e.preventDefault();
    setSubmitting(true);
    try
    {
      const payload={...formData, images: formImages};
      if (editingHostel)
      {
        await updateHostel(token, editingHostel._id, payload);
        addToast('Hostel updated successfully!');
      } else
      {
        await createHostel(token, payload);
        addToast('Hostel created successfully!');
      }
      setShowForm(false);
      fetchData();
    } catch (err)
    {
      addToast(err.response?.data?.message||'Something went wrong', 'error');
    }
    setSubmitting(false);
  };

  const handleDelete=async (id) =>
  {
    if (!window.confirm('Delete this hostel? This cannot be undone.')) return;
    try
    {
      await deleteHostel(token, id);
      addToast('Hostel deleted.');
      fetchData();
    } catch {addToast('Delete failed', 'error');}
  };

  const handleDeleteContact=async (id) =>
  {
    if (!window.confirm('Delete this message?')) return;
    try
    {
      await deleteContact(token, id);
      addToast('Message deleted.');
      fetchData();
    } catch {addToast('Delete failed', 'error');}
  };

  const handleLogout=() => {localStorage.removeItem('adminToken'); navigate('/admin');};

  if (loading) return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center">
      <div className="text-[#f0ebd8] text-lg flex items-center gap-3">
        <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading…
      </div>
    </div>
  );

  /* ─────────── SIDEBAR CONTENT ─────────── */
  const SidebarContent=() => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-[#f0ebd8]/10">
        <a href="/" className="flex items-center gap-3 mb-1">
          <img src={logo} alt="AuraLiving Logo" className="w-8 h-8 object-contain rounded-md" />
          <div>
            <span className="text-2xl font-bold text-[#f0ebd8]">Aura</span>
            <span className="text-2xl font-bold text-[#f0ebd8]/40">Living</span>
          </div>
        </a>
        <p className="text-[#f0ebd8]/40 text-xs mt-1">Admin Dashboard</p>
      </div>

      <nav className="p-4 flex-1 space-y-1">
        {[
          {id: 'hostels', label: 'Hostels', count: hostels.length, icon: <path d="M3 19H21V21H3V19ZM4 6H20V17H4V6ZM9 8V15H15V8H9Z" />},
          {id: 'contacts', label: 'Messages', count: contacts.length, icon: <path d="M6.455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.455Z" />},
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {setActiveTab(tab.id); setSidebarOpen(false);}}
            className={`nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${activeTab===tab.id? 'bg-[#f0ebd8] text-[#0d1b2a]':'text-[#f0ebd8]/60 hover:bg-[#f0ebd8]/10 hover:text-[#f0ebd8]'}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">{tab.icon}</svg>
            <span>{tab.label}</span>
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold
              ${activeTab===tab.id? 'bg-[#0d1b2a] text-[#f0ebd8]':'bg-[#f0ebd8]/10 text-[#f0ebd8]/60'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#f0ebd8]/10 space-y-2">
        <a href="/" target="_blank" rel="noreferrer"
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#f0ebd8]/60 hover:bg-[#f0ebd8]/10 hover:text-[#f0ebd8] transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z" />
          </svg>
          View Site
        </a>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0d1b2a] flex">
      <Toast toasts={toasts} />

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-60 xl:w-64 flex-shrink-0 flex-col bg-[#0a1520] border-r border-[#f0ebd8]/10 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar ── */}
      {sidebarOpen&&(
        <>
          <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-72 bg-[#0a1520] border-r border-[#f0ebd8]/10 z-50 lg:hidden flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Main Content ── */}
      <div className="main-content-area flex-1 lg:ml-60 xl:ml-64 flex flex-col min-h-screen">

        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-[#0a1520]/90 backdrop-blur border-b border-[#f0ebd8]/10 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden text-[#f0ebd8]" onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
            </svg>
          </button>
          <div>
            <h1 className="text-[#f0ebd8] font-bold text-lg capitalize">{activeTab}</h1>
            <p className="text-[#f0ebd8]/40 text-xs hidden sm:block">
              {activeTab==='hostels'? `${hostels.length} properties`:`${contacts.length} messages`}
            </p>
          </div>
          {activeTab==='hostels'&&(
            <button
              onClick={openAdd}
              className="ml-auto flex items-center gap-2 bg-[#f0ebd8] text-[#0d1b2a] px-4 py-2 rounded-xl text-sm font-bold hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" /></svg>
              Add Hostel
            </button>
          )}
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          {/* ══ HOSTELS TAB ══ */}
          {activeTab==='hostels'&&(
            <div>
              {hostels.length===0? (
                <div className="text-center py-24">
                  <p className="text-[#f0ebd8]/30 text-lg">No hostels yet</p>
                  <button onClick={openAdd} className="mt-4 text-[#f0ebd8]/60 underline text-sm">Add your first hostel</button>
                </div>
              ):(
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {hostels.map(hostel => (
                    <div key={hostel._id} className="stagger-item bg-[#f0ebd8] rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                      {/* Thumbnail */}
                      <div className="relative h-40 bg-[#0d1b2a]/10 flex-shrink-0">
                        {hostel.images&&hostel.images.length>0? (
                          <img src={hostel.images[0]} alt={hostel.name} className="w-full h-full object-cover" />
                        ):(
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-[#0d1b2a]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8a2 2 0 11-4 0 2 2 0 014 0M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1">
                          {hostel.popular&&(
                            <span className="bg-yellow-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Popular</span>
                          )}
                          {hostel.comming_soon&&(
                            <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Coming Soon</span>
                          )}
                        </div>
                        {hostel.images&&hostel.images.length>1&&(
                          <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                            +{hostel.images.length-1} photos
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-[#0d1b2a] text-base leading-tight">{hostel.name}</h3>
                        <p className="text-[#0d1b2a]/60 text-xs mt-1">{hostel.location}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-[#0d1b2a]/70">
                          <span className="font-semibold text-[#0d1b2a]">₹{hostel.price?.toLocaleString()}/mo</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#0d1b2a]/10">{hostel.gender}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#0d1b2a]/10">⭐ {hostel.rating}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button onClick={() => openEdit(hostel)}
                            className="flex-1 py-2 rounded-xl bg-[#0d1b2a] text-[#f0ebd8] text-xs font-bold hover:bg-[#1a2d40] transition-colors">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(hostel._id)}
                            className="flex-1 py-2 rounded-xl bg-red-500/10 text-red-600 text-xs font-bold hover:bg-red-500/20 transition-colors border border-red-500/20">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ CONTACTS TAB ══ */}
          {activeTab==='contacts'&&(
            <div className="space-y-3 max-w-3xl">
              {contacts.length===0? (
                <p className="text-[#f0ebd8]/30 py-16 text-center">No messages yet</p>
              ):contacts.map(c => (
                <div key={c._id} className="stagger-item bg-[#f0ebd8] rounded-2xl p-5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#0d1b2a]">{c.name}</h3>
                        <span className="text-[#0d1b2a]/40 text-xs">{new Date(c.createdAt).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                      </div>
                      <p className="text-[#0d1b2a]/60 text-xs">{c.email}{c.phone? ` · ${c.phone}`:''}</p>
                      {c.subject&&<p className="text-[#0d1b2a] font-semibold text-sm mt-2">{c.subject}</p>}
                      <p className="text-[#0d1b2a]/80 text-sm mt-1 leading-relaxed line-clamp-3">{c.message}</p>
                    </div>
                    <button onClick={() => handleDeleteContact(c._id)}
                      className="flex-shrink-0 p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ══ HOSTEL FORM MODAL ══ */}
      {showForm&&(
        <div className="form-modal-overlay fixed inset-0 z-[100] flex items-start justify-end bg-black/50 backdrop-blur-sm"
          onClick={(e) => {if (e.target===e.currentTarget) setShowForm(false);}}>
          <div className="form-modal-content relative w-full max-w-xl h-full bg-[#f0ebd8] shadow-2xl overflow-y-auto flex flex-col">

            {/* Form Header */}
            <div className="sticky top-0 bg-[#f0ebd8] border-b border-[#0d1b2a]/10 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-[#0d1b2a]">{editingHostel? 'Edit Hostel':'New Hostel'}</h2>
                <p className="text-[#0d1b2a]/50 text-xs">{editingHostel? `Editing: ${editingHostel.name}`:'Fill in the details below'}</p>
              </div>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-[#0d1b2a]/10 transition-colors">
                <svg className="w-5 h-5 text-[#0d1b2a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 px-6 py-5 space-y-5">

              {/* IMAGES */}
              <FormSection title="Photos" />
              <ImageUploader images={formImages} setImages={setFormImages} token={token} />

              {/* BASIC INFO */}
              <FormSection title="Basic Info" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Hostel Name *">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                    className={inputCls} required placeholder="e.g. AuraLiving Indore" />
                </Field>
                <Field label="Location *">
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange}
                    className={inputCls} required placeholder="City, State" />
                </Field>
                <Field label="Price (₹/month) *">
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange}
                    className={inputCls} required min="0" placeholder="e.g. 8000" />
                </Field>
                <Field label="Gender">
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className={selectCls}>
                    <option>Co-ed</option>
                    <option>Boys Only</option>
                    <option>Girls Only</option>
                  </select>
                </Field>
                <Field label="Rating (0–5)">
                  <input type="number" name="rating" value={formData.rating} onChange={handleInputChange}
                    className={inputCls} step="0.1" min="0" max="5" placeholder="4.5" />
                </Field>
                <Field label="Hostel Type">
                  <input type="text" name="hostelType" value={formData.hostelType} onChange={handleInputChange}
                    className={inputCls} placeholder="Standard / Premium / Luxury" />
                </Field>
                <Field label="Established">
                  <input type="number" name="established" value={formData.established} onChange={handleInputChange}
                    className={inputCls} />
                </Field>
              </div>

              {/* DESCRIPTION */}
              <FormSection title="Description" />
              <Field label="About this hostel">
                <textarea name="description" value={formData.description} onChange={handleInputChange}
                  rows="3" className={inputCls} placeholder="Write a brief description…" />
              </Field>

              {/* BEDS & OCCUPANCY */}
              <FormSection title="Beds & Occupancy" />
              <div className="grid grid-cols-3 gap-4">
                <Field label="Total Beds">
                  <input type="number" name="totalRemainingBeds" value={formData.totalRemainingBeds}
                    onChange={handleInputChange} className={inputCls} min="0" />
                </Field>
                <Field label="Capacity">
                  <input type="number" name="capacity" value={formData.capacity}
                    onChange={handleInputChange} className={inputCls} min="0" />
                </Field>
                <Field label="Occupancy %">
                  <input type="number" name="occupancy" value={formData.occupancy}
                    onChange={handleInputChange} className={inputCls} min="0" max="100" />
                </Field>
              </div>

              {/* FEATURES & USPS */}
              <FormSection title="Features & USPs" />
              <Field label="Features (comma separated)">
                <input type="text" value={(formData.features||[]).join(', ')} onChange={(e) => handleArrayInput('features', e.target.value)}
                  className={inputCls} placeholder="WiFi, AC, Hot Water, Gym" />
              </Field>
              <Field label="USPs (comma separated)">
                <input type="text" value={(formData.usps||[]).join(', ')} onChange={(e) => handleArrayInput('usps', e.target.value)}
                  className={inputCls} placeholder="Silent Study Zone, Rooftop Lounge" />
              </Field>

              {/* NEARBY */}
              <FormSection title="Nearby Places" />
              <div className="space-y-3">
                {[1, 2, 3].map(n => (
                  <div key={n} className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <input type="text" name={`nearby${n}`} value={formData[`nearby${n}`]} onChange={handleInputChange}
                        className={inputCls} placeholder={`Nearby place ${n}`} />
                    </div>
                    <input type="text" name={`nearby${n}distance`} value={formData[`nearby${n}distance`]} onChange={handleInputChange}
                      className={inputCls} placeholder="e.g. 1.2 km" />
                  </div>
                ))}
              </div>

              {/* LOCATION LINK */}
              <Field label="Google Maps Link">
                <input type="text" name="locationLink" value={formData.locationLink} onChange={handleInputChange}
                  className={inputCls} placeholder="https://maps.google.com/..." />
              </Field>

              {/* FLAGS */}
              <FormSection title="Flags" />
              <div className="flex flex-wrap gap-6">
                {[
                  {name: 'popular', label: 'Mark as Popular'},
                  {name: 'comming_soon', label: 'Coming Soon'},
                ].map(flag => (
                  <label key={flag.name} className="flex items-center gap-2 cursor-pointer">
                    <div className={`w-10 h-6 rounded-full transition-colors relative
                      ${formData[flag.name]? 'bg-[#0d1b2a]':'bg-[#0d1b2a]/20'}`}
                      onClick={() => setFormData(prev => ({...prev, [flag.name]: !prev[flag.name]}))}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-[#f0ebd8] shadow transition-transform duration-200
                        ${formData[flag.name]? 'translate-x-5':'translate-x-1'}`} />
                    </div>
                    <span className="text-sm text-[#0d1b2a] font-medium">{flag.label}</span>
                  </label>
                ))}
              </div>

              {/* Sticky Submit */}
              <div className="sticky bottom-0 left-0 right-0 bg-[#f0ebd8] pt-4 pb-2 border-t border-[#0d1b2a]/10 flex gap-3">
                <button type="submit" disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-[#0d1b2a] text-[#f0ebd8] font-bold text-sm hover:bg-[#1a2d40] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {submitting&&(
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {submitting? 'Saving…':editingHostel? 'Update Hostel':'Create Hostel'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-3 rounded-xl bg-[#0d1b2a]/10 text-[#0d1b2a] font-bold text-sm hover:bg-[#0d1b2a]/20 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
