import { type ChangeEvent, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  Play,
  Search,
  Upload,
  Video,
  X,
} from 'lucide-react';
import avatarAsset from '@assets/a281ef6426873e181efef3a303920ed5d9bfe0439e14e25863af9634add4a_1786721849029.webp';
import familyPremiereAsset from '@assets/Untitled_-_14_August_2026_at_14.33.43_(1)_1786724126222.mp4';
import birthdayReelAsset from '@assets/Untitled_-_14_August_2026_at_22.09.23_1786725778122.mp4';
import episodeOneAsset from '@assets/VID-20260815-WA0011_1786775968738.mp4';
import episodeTwoAsset from '@assets/4922_1786776378654.mp4';
import episodeThreeAsset from '@assets/4927_1786776561320.mp4';

type MediaKind = 'image' | 'video';
type MediaItem = {
  id: string;
  title: string;
  detail: string;
  kind: MediaKind;
  src?: string;
  objectPosition?: string;
};

const initialMemories: MediaItem[] = [
  { id: 'memory-01', title: 'The camera roll', detail: 'A moment worth keeping', kind: 'image', src: avatarAsset, objectPosition: '50% 35%' },
  { id: 'memory-02', title: 'Main character energy', detail: 'A still from the story', kind: 'image', src: avatarAsset, objectPosition: '78% 52%' },
  { id: 'memory-03', title: 'Scene one: ASH', detail: 'The best kind of candid', kind: 'image', src: avatarAsset, objectPosition: '28% 56%' },
  { id: 'memory-04', title: 'Behind the lens', detail: 'Director’s cut', kind: 'image', src: avatarAsset, objectPosition: '54% 72%' },
];

const initialWishes: MediaItem[] = [
  { id: 'wish-family', title: 'The family premiere', detail: 'Your uploaded birthday video', kind: 'video', src: familyPremiereAsset },
  { id: 'wish-friend-episode-1', title: 'EPISODE 1', detail: 'The friend group', kind: 'video', src: episodeOneAsset },
  { id: 'wish-friend-episode-2', title: 'EPISODE 2', detail: 'The friend group', kind: 'video', src: episodeTwoAsset },
  { id: 'wish-friend-episode-3', title: 'EPISODE 3', detail: 'The friend group', kind: 'video', src: episodeThreeAsset },
  { id: 'wish-secret', title: 'A little surprise', detail: 'A message is waiting', kind: 'video' },
];

function Gate({ onSelect }: { onSelect: () => void }) {
  return (
    <main className="gate noise" data-testid="profile-gate">
      <div className="gate-card reveal">
        <div className="gate-logo">ASHFLIX / PRIVATE PREMIERE</div>
        <h1 className="gate-title">Who’s watching?</h1>
        <p className="gate-subtitle">Choose your profile to enter tonight’s birthday screening.</p>
        <div className="profile-grid">
          <button className="profile-button" onClick={onSelect} data-testid="button-select-ash" aria-label="Watch as ASH">
            <img className="profile-avatar" src={avatarAsset} alt="Spider-Man holding a vintage camera" data-testid="img-profile-ash" />
            <span className="profile-name">ASH</span>
          </button>
        </div>
      </div>
      <div className="gate-mark">A private collection / made for one</div>
    </main>
  );
}

function SectionHeader({
  title,
  caption,
  count,
  onPrevious,
  onNext,
  previousTestId,
  nextTestId,
}: {
  title: string;
  caption?: string;
  count?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  previousTestId: string;
  nextTestId: string;
}) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-heading">{title}{count && <span>{count}</span>}</h2>
        {caption && <p className="section-caption">{caption}</p>}
      </div>
      {onPrevious && onNext && (
        <div className="section-tools">
          <button className="circle-button" onClick={onPrevious} data-testid={previousTestId} aria-label={`Previous ${title.toLowerCase()}`}>
            <ArrowLeft size={15} />
          </button>
          <button className="circle-button" onClick={onNext} data-testid={nextTestId} aria-label={`Next ${title.toLowerCase()}`}>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

function WishCard({ item, onOpen }: { item: MediaItem; onOpen: (item: MediaItem) => void }) {
  return (
    <button className="wish-card" onClick={() => onOpen(item)} data-testid={`card-wish-${item.id}`} aria-label={`Play ${item.title}`}>
      <span className="wish-content">
        <span className="wish-mark">“</span>
        <span>
          <span className="wish-person">{item.title}</span>
          <span className="wish-type">{item.detail}</span>
        </span>
        <span className="wish-play"><span>PLAY MESSAGE</span><span className="wish-play-icon"><Play size={12} fill="currentColor" /></span></span>
      </span>
    </button>
  );
}

function PlayerModal({
  media,
  onClose,
  onUpload,
}: {
  media: MediaItem;
  onClose: () => void;
  onUpload: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="player-modal" role="dialog" aria-modal="true" aria-labelledby="player-title" data-testid="modal-media-player">
        <button className="modal-close" onClick={onClose} data-testid="button-close-player" aria-label="Close media player"><X size={19} /></button>
        {media.src && media.kind === 'video' ? (
          <video className="player-video" controls autoPlay src={media.src} data-testid="video-player">
            Your browser does not support video playback.
          </video>
        ) : media.src && media.kind === 'image' ? (
          <img className="player-media" src={media.src} alt={media.title} data-testid="img-player" />
        ) : (
          <div className="player-empty" data-testid="empty-player-state">
            <div>
              <div className="empty-symbol"><Video size={28} /></div>
              <h2>There’s a message here for you.</h2>
              <p>This screen is ready for its premiere. Upload a birthday wish below, then come back and press play.</p>
              <button className="primary-button" onClick={onUpload} data-testid="button-upload-from-player"><Upload size={15} /> Upload a wish video</button>
            </div>
          </div>
        )}
        <div className="player-details">
          <div className="player-kicker">Now screening</div>
          <h2 id="player-title">{media.title}</h2>
          <p>{media.detail}</p>
        </div>
      </section>
    </div>
  );
}

function Dashboard({ onSwitchProfile }: { onSwitchProfile: () => void }) {
  const [, setMemories] = useState<MediaItem[]>(initialMemories);
  const [wishes, setWishes] = useState<MediaItem[]>(initialWishes);
  const [playerMedia, setPlayerMedia] = useState<MediaItem | null>(null);
  const [notice, setNotice] = useState('');
  const wishRowRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const moveRow = (row: React.RefObject<HTMLDivElement | null>, direction: number) => {
    row.current?.scrollBy({ left: direction * 330, behavior: 'smooth' });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const next: MediaItem = { id: `memory-upload-${Date.now()}`, title: file.name.replace(/\.[^.]+$/, ''), detail: 'Added to ASH’s collection', kind: 'image', src: URL.createObjectURL(file) };
    setMemories((current) => [...current, next]);
    setNotice('Your photo has joined the premiere.');
    event.target.value = '';
  };

  const handleVideoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const uploaded = files.map((file, index): MediaItem => ({
      id: `wish-upload-${Date.now()}-${index}`,
      title: files.length === 1 ? 'A new birthday wish' : `Birthday wish ${index + 1}`,
      detail: file.name,
      kind: 'video',
      src: URL.createObjectURL(file),
    }));
    setWishes((current) => [...current, ...uploaded]);
    setNotice(files.length === 1 ? 'Your birthday wish is ready to screen.' : `${files.length} birthday wishes are ready to screen.`);
    setPlayerMedia(uploaded[0]);
    event.target.value = '';
  };

  const openHero = () => setPlayerMedia({
    id: 'birthday-screening',
    title: 'ASH’s birthday reel',
    detail: 'Your uploaded 2026 birthday premiere',
    kind: 'video',
    src: birthdayReelAsset,
  });
  const openUpload = () => videoInputRef.current?.click();

  return (
    <main className="app-shell noise" data-testid="birthday-dashboard">
      <header className="topbar">
        <div className="brand" data-testid="text-brand">ASHFLIX</div>
        <nav className="nav" aria-label="Main navigation">
          <button className="active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="nav-home">Home</button>
          <button onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })} data-testid="nav-explore">Explore</button>
          <button onClick={() => document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' })} data-testid="nav-wishes">Wishes</button>
        </nav>
        <div className="topbar-actions">
          <button className="topbar-icon" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Explore moments" data-testid="button-search"><Search size={18} /></button>
          <button className="topbar-icon" onClick={onSwitchProfile} aria-label="Switch profile" data-testid="button-switch-profile"><img className="mini-profile" src={avatarAsset} alt="" /></button>
        </div>
      </header>

      <section className="hero" data-testid="hero-birthday">
        <div className="hero-art" style={{ backgroundImage: `linear-gradient(90deg, #141414 2%, rgba(20,20,20,.94) 25%, rgba(20,20,20,.42) 56%, rgba(20,20,20,.18)), linear-gradient(0deg, #141414 0%, transparent 38%), url("${avatarAsset}")` }} />
        <div className="hero-copy reveal">
          <div className="eyebrow">A private birthday premiere / 2026</div>
          <h1 className="hero-title">This one’s<br /><em>for you,</em> ASH.</h1>
          <div className="hero-meta"><span>Celebration special</span><span className="meta-dot" /><span>All your people</span><span className="meta-dot" /><span>One very good year</span></div>
          <p className="hero-desc">A collection of the little moments, big love, and questionable camera angles that make your story impossible not to celebrate.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={openHero} data-testid="button-play-birthday"><Play size={17} fill="currentColor" /> Play birthday reel</button>
            <button className="secondary-button" onClick={() => document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-see-wishes"><Info size={16} /> See the lineup</button>
          </div>
        </div>
        <div className="hero-aside"><span className="pulse-dot" /> Screening room is open</div>
      </section>

      <div className="content">
        <div className="welcome-strip reveal delay-1">
          <div><div className="welcome-kicker">Tonight’s feature</div><h2 className="welcome-title">Happy birthday, ASH. Your people pressed record.</h2></div>
          <div className="welcome-date">A private screening<br /><strong>made with a lot of love</strong></div>
        </div>

        <section className="section reveal delay-2" id="wishes">
          <SectionHeader title="Messages for your next chapter" count={`${wishes.length} waiting`} caption="The people who know you best have something to say." onPrevious={() => moveRow(wishRowRef, -1)} onNext={() => moveRow(wishRowRef, 1)} previousTestId="button-previous-wishes" nextTestId="button-next-wishes" />
          <div className="horizontal-scroll" ref={wishRowRef} data-testid="carousel-wishes">
            {wishes.map((wish) => <WishCard key={wish.id} item={wish} onOpen={setPlayerMedia} />)}
            <button className="upload-card" onClick={openUpload} data-testid="button-upload-wish"><span className="upload-icon"><Video size={18} /></span><span className="upload-label">Add birthday wishes</span><span className="upload-hint">Select one or more videos</span></button>
          </div>
          <input ref={videoInputRef} className="sr-only-input" type="file" accept="video/mp4,video/quicktime,video/webm,video/*" multiple onChange={handleVideoUpload} data-testid="input-upload-wish" />
        </section>

        <section className="section reveal delay-3" id="explore">
          <SectionHeader title="Explore moments" caption="Take the scenic route through ASH’s universe." previousTestId="button-previous-explore" nextTestId="button-next-explore" />
          <div className="explore-grid">
            <button className="explore-card large" style={{ backgroundImage: `linear-gradient(135deg, rgba(102,24,28,.58), rgba(28,23,22,.9)), url("${avatarAsset}")`, backgroundPosition: 'center 44%', backgroundSize: 'cover' }} onClick={openHero} data-testid="card-explore-birthday">
              <span className="explore-content"><span className="explore-number">01</span><span className="explore-title">The birthday reel</span><span className="explore-text">A first look at tonight’s main event</span></span>
            </button>
            <button className="explore-card" onClick={() => setPlayerMedia(initialWishes[0])} data-testid="card-explore-family">
              <span className="explore-content"><span className="explore-number">02</span><span className="explore-title">Family cut</span><span className="explore-text">The stories that started it all</span></span>
            </button>
            <button className="explore-card" onClick={() => imageInputRef.current?.click()} data-testid="card-explore-add">
              <span className="explore-content"><span className="explore-number">+</span><span className="explore-title">Make it yours</span><span className="explore-text">Add a frame to the collection</span></span>
            </button>
          </div>
          <input ref={imageInputRef} className="sr-only-input" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageUpload} data-testid="input-upload-photo" />
        </section>

        <footer className="footer">
          <span><strong>ASHFLIX</strong> &nbsp; A private birthday cinema.</span>
          <span>Made for ASH, with excellent taste.</span>
        </footer>
      </div>

      {playerMedia && <PlayerModal media={playerMedia} onClose={() => setPlayerMedia(null)} onUpload={openUpload} />}
      {notice && <div className="notice" role="status" data-testid="status-upload"><Check size={14} style={{ verticalAlign: 'middle', marginRight: 7 }} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification" data-testid="button-dismiss-notice"><X size={13} style={{ verticalAlign: 'middle', marginLeft: 9 }} /></button></div>}
    </main>
  );
}

function App() {
  const [profileSelected, setProfileSelected] = useState(false);
  return profileSelected ? <Dashboard onSwitchProfile={() => setProfileSelected(false)} /> : <Gate onSelect={() => setProfileSelected(true)} />;
}

export default App;