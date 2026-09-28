import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';

export default function FacultiesPage() {
  const faculties = [
    {
      code: 'ADMIN',
      name: 'Faculty of Administration',
      established: '1962',
      location: 'Beside Hezekiah Library & Pit Theatre',
      departments: [
        'Management & Accounting',
        'Public Administration',
        'International Relations',
        'Local Government Studies',
      ],
      description:
        'One of the oldest faculties on campus, focused on business management, governance, diplomacy, and finance.',
    },
    {
      code: 'AGRIC',
      name: 'Faculty of Agriculture',
      established: '1962',
      location: 'Agriculture Complex & Teaching Farm',
      departments: [
        'Agricultural Economics',
        'Animal Sciences',
        'Crop Production & Protection',
        'Soil Science & Land Resources Mgt',
        'Agricultural Extension & Rural Sociology',
        'Family, Nutrition & Consumer Sciences',
      ],
      description:
        'Combines classroom study with hands-on field research on the university teaching and research farm.',
    },
    {
      code: 'ARTS',
      name: 'Faculty of Arts',
      established: '1962',
      location: 'Humanities Blocks 1, 2 & 3',
      departments: [
        'English Language & Literature',
        'Dramatic Arts',
        'Foreign Languages',
        'Linguistics & African Languages',
        'History',
        'Philosophy',
        'Religious Studies',
        'Music',
      ],
      description:
        'The cultural and linguistic center of Great Ife, celebrated globally for its literary scholars, linguistics, and the iconic Pit Theatre.',
    },
    {
      code: 'BMS',
      name: 'Faculty of Basic Medical Sciences',
      established: '1972',
      location: 'College of Health Sciences Complex, Road 2',
      departments: [
        'Anatomy & Cell Biology',
        'Physiological Sciences',
        'Medical Biochemistry',
        'Medical Rehabilitation (Physiotherapy)',
      ],
      description:
        'Provides foundational preclinical disciplines for human health training, including human anatomy, physiology, and rehabilitation sciences.',
    },
    {
      code: 'CLIN',
      name: 'Faculty of Clinical Sciences',
      established: '1972',
      location: 'Pre-clinical: Road 2; Clinical: OAUTHC Teaching Hospital',
      departments: [
        'Medicine & Surgery',
        'Paediatrics & Child Health',
        'Obstetrics & Gynaecology',
        'Community Health',
      ],
      description:
        'Prepares medical doctors through intensive hospital ward rotations, community health clerkships, and surgical theater training at OAUTHC.',
    },
    {
      code: 'COMP',
      name: 'Faculty of Computing',
      established: '2023',
      location: 'Computing Complex & INTECU ICT Corridor',
      departments: [
        'Computer Science',
        'Computer Engineering',
        'Information & Communication Technology',
        'Cyber Security',
        'Software Engineering',
      ],
      description:
        'Formed from the unbundling of Computer Science & Engineering to advance cutting-edge software development, artificial intelligence, and cyber systems.',
    },
    {
      code: 'DENT',
      name: 'Faculty of Dentistry',
      established: '1972',
      location: 'Dental Hospital Complex (Road 2 & OAUTHC)',
      departments: [
        'Child Dental Health',
        'Oral & Maxillofacial Surgery',
        'Preventive & Community Dentistry',
        'Restorative Dentistry',
      ],
      description:
        'Premier dental education and oral surgical training center in Nigeria, offering hands-on patient dental care and phantom head lab practice.',
    },
    {
      code: 'EDUC',
      name: 'Faculty of Education',
      established: '1967',
      location: 'Education Building near Social Sciences & Fajuyi Hall',
      departments: [
        'Educational Foundations & Counselling',
        'Educational Management',
        'Special Education & Curriculum Studies',
        'Physical & Health Education',
        'Science & Technology Education',
        'Arts & Social Sciences Education',
      ],
      description:
        'Trains secondary and tertiary educators, education planners, curriculum specialists, and physical health professionals.',
    },
    {
      code: 'EDM',
      name: 'Faculty of Environmental Design & Management',
      established: '1982',
      location: 'Yellow House & Architecture Studios',
      departments: [
        'Architecture',
        'Building',
        'Estate Management',
        'Quantity Surveying',
        'Urban & Regional Planning',
        'Fine & Applied Arts',
        'Surveying & Geoinformatics',
      ],
      description:
        'Housed in the building popularly known as "Yellow House", EDM students focus on the built environment, spatial planning, and fine arts.',
    },
    {
      code: 'LAW',
      name: 'Faculty of Law',
      established: '1962',
      location: 'Law Complex near Central Administration & SUB',
      departments: [
        'Business Law',
        'International Law',
        'Jurisprudence & Private Law',
        'Public Law',
      ],
      description:
        'Known for producing distinguished jurists and legal minds. Includes an operational moot court and specialized law library.',
    },
    {
      code: 'NURS',
      name: 'Faculty of Nursing Science',
      established: '1993',
      location: 'Nursing Administration Wing, CHS Complex & OAUTHC',
      departments: [
        'Community Health Nursing',
        'Maternal & Child Health Nursing',
        'Medical-Surgical Nursing',
        'Mental Health & Psychiatric Nursing',
      ],
      description:
        'Pioneered collegiate nursing education in West Africa, training registered nurses, midwives, and public health nursing leaders.',
    },
    {
      code: 'PHARM',
      name: 'Faculty of Pharmacy',
      established: '1969',
      location: 'Pharmacy Complex along Road 2',
      departments: [
        'Clinical Pharmacy & Pharmacy Administration',
        'Pharmaceutical Chemistry',
        'Pharmaceutics',
        'Pharmacognosy',
        'Pharmacology',
      ],
      description:
        'A premier pharmaceutical training center recognized for research into medicinal plants, drug formulation, and clinical practice.',
    },
    {
      code: 'SCI',
      name: 'Faculty of Science',
      established: '1962',
      location: 'White House & Central Science Quadrangle',
      departments: [
        'Chemistry',
        'Mathematics',
        'Physics',
        'Zoology',
        'Botany',
        'Microbiology',
        'Biochemistry & Molecular Biology',
        'Geology',
      ],
      description:
        'Houses fundamental physical and biological sciences. Freshmen across Tech, Health Sciences, Pharmacy, and Agric take large general courses (CHM 101, PHY 101, MTH 101, BIO 101) here.',
    },
    {
      code: 'SOC SCI',
      name: 'Faculty of Social Sciences',
      established: '1962',
      location: 'Social Sciences Complex & 1000-Seater',
      departments: [
        'Economics',
        'Political Science',
        'Sociology & Anthropology',
        'Geography',
        'Psychology',
        'Demography & Social Statistics',
      ],
      description:
        'Dedicated to the study of human society, governance, and economies. Hosts large 100-level lecture classes for campus-wide social science electives.',
    },
    {
      code: 'TECH',
      name: 'Faculty of Technology',
      established: '1970',
      location: 'Spider House & Engineering Buildings',
      departments: [
        'Electronic & Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Chemical Engineering',
        'Agricultural & Environmental Engineering',
        'Food Science & Technology',
        'Materials Science & Engineering',
      ],
      description:
        'Famous for its distinctive open concrete design named "Spider House". It trains engineers, industrial technologists, and applied scientists.',
    },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Page Header */}
      <div className="relative border border-slate-200 bg-white p-6 sm:p-8 space-y-3 overflow-hidden">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="square" color="navy" size="lg" variant="outline" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800">
          <GeometricShape type="hexagon" color="gold" size="sm" />
          <span>ACADEMIC STRUCTURE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-oau-navy">
          <WordAccent shape="square" color="navy">15 Faculties</WordAccent> & Academic Structure of OAU
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          Obafemi Awolowo University runs 15 academic faculties across physical sciences, computing,
          engineering, humanities, law, administration, agriculture, education, and medical sciences.
          Below is the official directory of faculties and departments.
        </p>
      </div>

      {/* General Academic Rules Summary */}
      <div className="border border-slate-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
            General Academic Regulations (All Students)
          </h2>
          <span className="text-[11px] font-semibold text-slate-500">Senate Regulations</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-900 text-sm">Two Semesters Per Session</p>
              <GeometricShape type="circle" color="emerald" size="sm" />
            </div>
            <p className="leading-relaxed">
              Every academic session is divided into two terms: <strong>Harmattan Semester</strong> (first semester)
              and <strong>Rain Semester</strong> (second semester).
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-900 text-sm">75% Class Attendance</p>
              <GeometricShape type="triangle" color="gold" size="sm" />
            </div>
            <p className="leading-relaxed">
              University regulations require students to maintain at least 75% attendance in lectures
              and practical sessions to be eligible to sit for semester examinations.
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-900 text-sm">Course Unit System</p>
              <GeometricShape type="square" color="blue" size="sm" />
            </div>
            <p className="leading-relaxed">
              Every course is assigned credit units (typically 1 to 4 units). Your Grade Point Average
              is computed on a 5.0 scale based on these credit units.
            </p>
          </div>
        </div>
      </div>

      {/* Faculties Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
            Directory of All 15 Faculties
          </h2>
          <span className="text-xs text-slate-500 font-medium">15 Academic Divisions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faculties.map((fac, idx) => {
            const facShapes: Array<{ type: 'square' | 'triangle' | 'hexagon' | 'circle'; color: 'navy' | 'blue' | 'emerald' | 'gold' | 'amber' }> = [
              { type: 'triangle', color: 'blue' },
              { type: 'hexagon', color: 'gold' },
              { type: 'square', color: 'navy' },
              { type: 'circle', color: 'amber' },
              { type: 'square', color: 'blue' },
              { type: 'hexagon', color: 'amber' },
              { type: 'circle', color: 'emerald' },
              { type: 'triangle', color: 'emerald' },
              { type: 'square', color: 'navy' },
              { type: 'hexagon', color: 'emerald' },
              { type: 'circle', color: 'gold' },
              { type: 'triangle', color: 'blue' },
              { type: 'square', color: 'emerald' },
              { type: 'hexagon', color: 'navy' },
              { type: 'circle', color: 'blue' },
            ];
            const curShape = facShapes[idx % facShapes.length];

            return (
              <div key={fac.code} className="border border-slate-200 bg-white p-5 space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2.5">
                    <GeometricShape type={curShape.type} color={curShape.color} size="sm" />
                    <div>
                      <span className="text-xs font-bold text-campus-blue uppercase tracking-wider">
                        {fac.code}
                      </span>
                      <h3 className="text-base font-black text-oau-navy">{fac.name}</h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
                    Est. {fac.established}
                  </span>
                </div>

              <p className="text-xs text-slate-600 leading-relaxed">{fac.description}</p>

              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-800 block">Departments:</span>
                <div className="flex flex-wrap gap-1.5">
                  {fac.departments.map((dept, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 text-[11px]"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span className="font-bold text-slate-700">Location: </span>
                <span>{fac.location}</span>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Link to Freshman App */}
      <div className="border border-amber-400 bg-amber-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-oau-navy">Are you taking 100-Level Courses?</h3>
          <p className="text-xs text-slate-700">
            Check the Freshman Companion App to calculate your target GPA and explore course bundles across all 15 faculties.
          </p>
        </div>
        <a
          href="/app/academics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-oau-navy font-bold text-xs border border-amber-500 shrink-0"
        >
          <span>Open 100L Course Navigator</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
