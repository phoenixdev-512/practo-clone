export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-practoBlue text-white py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-lightBlue">Practo</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Making healthcare accessible to everyone, everywhere.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lightBlue">For patients</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Search for doctors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Search for clinics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Search for hospitals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Book health checkup</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lightBlue">For doctors</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Practo Profile</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For Clinics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ray by Practo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Practo Reach</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lightBlue">More</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lightBlue">Social</h4>
            <div className="grid grid-cols-4 gap-3">
              {['F', 'T', 'In', 'Yt'].map((s) => (
                <span
                  key={s}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-200 hover:bg-white/20 transition"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2025 Practo Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}