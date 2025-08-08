import Link from 'next/link';
import { notFound } from 'next/navigation';

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  location: string;
};

function initials(name: string) {
  if (!name) return 'DR';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

async function fetchDoctor(id: string): Promise<Doctor | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/doctors/${id}`, {
      // Revalidate periodically; details don't change often
      next: { revalidate: 120 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch doctor');
    const data = (await res.json()) as Doctor;
    return data;
  } catch (e) {
    return null;
  }
}

export default async function DoctorDetailsPage({ params }: { params: { id: string } }) {
  const doctor = await fetchDoctor(params.id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header / breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-practoBlue">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/doctor-listing" className="hover:text-practoBlue">Doctors</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">{doctor.name}</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">{doctor.name}</h1>
          <p className="text-gray-600 mt-1">
            {doctor.specialty} • {doctor.location}
          </p>
        </div>
      </section>

      {/* Main card */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-lightBlue text-practoBlue flex items-center justify-center text-3xl font-bold">
                    {initials(doctor.name)}
                  </div>
                </div>

                {/* Middle: Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                        {doctor.name}
                      </h2>
                      <p className="text-practoBlue font-medium mt-1">{doctor.specialty}</p>
                      <p className="text-gray-600 mt-1">📍 {doctor.location}</p>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center text-sm">
                          <span className="text-yellow-400 mr-1">★★★★★</span>
                          <span className="text-gray-600">4.8 • 150+ reviews</span>
                        </div>
                        <div className="hidden md:block h-4 w-px bg-gray-300" />
                        <div className="text-sm text-green-700">✅ 95% Patient Satisfaction</div>
                      </div>
                    </div>

                    {/* Right: Primary CTA */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="bg-practoBlue hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                        Book Clinic Visit
                      </button>
                      <button className="border border-practoBlue text-practoBlue hover:bg-lightBlue px-6 py-3 rounded-xl font-semibold transition-colors">
                        Video Consult
                      </button>
                    </div>
                  </div>

                  {/* Tabs / Sections */}
                  <div className="mt-8">
                    <div className="flex gap-6 border-b border-gray-200">
                      <button className="pb-3 -mb-px border-b-2 border-practoBlue text-practoBlue font-semibold">
                        Overview
                      </button>
                      <button className="pb-3 text-gray-600 hover:text-gray-900">Experience</button>
                      <button className="pb-3 text-gray-600 hover:text-gray-900">Patient Stories</button>
                      <button className="pb-3 text-gray-600 hover:text-gray-900">Locations</button>
                    </div>

                    {/* Overview content */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-6">
                        <div className="p-6 border border-gray-200 rounded-xl">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                          <p className="text-gray-700 leading-relaxed">
                            {doctor.name} is a trusted {doctor.specialty} practicing in {doctor.location}.
                            Book an appointment for a comprehensive consultation tailored to your needs.
                          </p>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-xl">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Services</h3>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>In-clinic consultation</li>
                            <li>Video consultation</li>
                            <li>Follow-up and treatment planning</li>
                          </ul>
                        </div>
                      </div>

                      <aside className="space-y-6">
                        <div className="p-6 border border-gray-200 rounded-xl">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Clinic Timings</h4>
                          <p className="text-gray-700">Mon - Sat: 10:00 AM - 6:00 PM</p>
                          <p className="text-gray-500 text-sm mt-1">Slots fill fast</p>
                          <button className="mt-4 w-full bg-practoBlue hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                            Check Availability
                          </button>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-xl">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Location</h4>
                          <p className="text-gray-700">{doctor.location}</p>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action bar (mobile) */}
            <div className="border-t border-gray-200 p-4 flex sm:hidden gap-3 sticky bottom-0 bg-white">
              <button className="flex-1 bg-practoBlue hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold">
                Book Visit
              </button>
              <button className="flex-1 border border-practoBlue text-practoBlue hover:bg-lightBlue px-4 py-3 rounded-lg font-semibold">
                Video Consult
              </button>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-6">
            <Link href="/doctor-listing" className="text-practoBlue hover:text-blue-700 font-semibold">
              ← Back to Doctors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}