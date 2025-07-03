export default function ProfilePhoto({ className = '' }) {
    return (
      <div className={`photo-circle rounded-full overflow-hidden mb-4 ${className}`}>
        <img src="/images/aimilios.jpeg" alt="Your Name" className="w-full h-full object-cover" />
      </div>
    );
  }
  