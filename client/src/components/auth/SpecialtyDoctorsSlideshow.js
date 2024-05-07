import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';

const SpecialtyDoctorsSlideshow = () => {
  // Dummy data for specialties and top 5 doctors for each specialty
  const specialties = [
    {
      name: 'Dermatologists',
      doctors: [
        {
          name: 'Dr. Michael Brown',
          image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg?t=st=1714917399~exp=1714920999~hmac=c5d82a2fd8e3a1b63142f7db627aadf3ce38902e50aca29ae63f7bd25bfa4a3f&w=360',
          details: 'Experienced in dermatologic surgery and cosmetic dermatology procedures.',
        },
        {
          name: 'Dr. Emily Wilson',
          image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?t=st=1714932220~exp=1714935820~hmac=af93c99d824d8e7540e2eed0a859d7d3029a752d17cb1c71cfd3ed0be3b13cf6&w=360',
          details: 'Expertise in pediatric dermatology and treating skin conditions in children.',
        },{
            name: 'Dr. Sarah Johnson',
            image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg?t=st=1714917399~exp=1714920999~hmac=c5d82a2fd8e3a1b63142f7db627aadf3ce38902e50aca29ae63f7bd25bfa4a3f&w=360',
            details: 'Specializes in treating skin conditions such as acne, eczema, and psoriasis.',
          },
        {
          name: 'Dr. David Martinez',
          image: 'https://img.freepik.com/premium-photo/photo-portrait-beautiful-young-female-doctor-looking-camera_763111-137933.jpg?w=360',
          details: 'Specializes in Mohs micrographic surgery for skin cancer treatment.',
        },
        {
          name: 'Dr. Olivia Parker',
          image: 'https://img.freepik.com/free-photo/close-up-health-worker_23-2149112580.jpg?t=st=1714932479~exp=1714936079~hmac=1c367232152f2e3b366ea520eafa70af3fa9b3b176021e2326a462346f78f94d&w=360',
          details: 'Provides comprehensive care for skin diseases and aesthetic treatments.',
        },
      ],
    },
    {
      name: 'Cardiologists',
      doctors: [
        {
          name: 'Dr. James Anderson',
          image: 'https://img.freepik.com/free-photo/portrait-confident-male-doctor_329181-12190.jpg?t=st=1714932271~exp=1714935871~hmac=574e71ad798eceb8f227abf796e7d3bffc73f73bd3f00b4b4f85707b835492bf&w=360',
          details: 'Specializes in diagnosing and treating heart diseases and conditions.',
        },
        {
          name: 'Dr. Elizabeth Carter',
          image: 'https://img.freepik.com/premium-psd/female-doctor-isolated-transparent-background_879541-1281.jpg?w=360',
          details: 'Experienced in interventional cardiology procedures such as angioplasty and stent placement.',
        },
        {
          name: 'Dr. Christopher Lee',
          image: 'https://img.freepik.com/premium-photo/male-doctor-light-surface_392895-24691.jpg?w=360',
          details: 'Expertise in electrophysiology for diagnosing and treating heart rhythm disorders.',
        },
        {
          name: 'Dr. Maria Garcia',
          image: 'https://img.freepik.com/premium-photo/latin-american-doctor-woman-standing-with-arms-crossed-smiling-hospital-physician-ready-examine-patient-health-care-insurance-help-concept-physician-ready-examine-patient_665183-8189.jpg?w=360',
          details: 'Specializes in cardiac imaging techniques including echocardiography and cardiac MRI.',
        },
        {
          name: 'Dr. Benjamin Taylor',
          image: 'https://img.freepik.com/free-photo/close-up-health-worker_23-2149112503.jpg?t=st=1714932417~exp=1714936017~hmac=c00b1b731f1bbd73c7860ba24c63676358e9837b58ce996c84f82e34279be4c0&w=360',
          details: 'Provides comprehensive care for patients with heart failure and other cardiac conditions.',
        },
      ],
    },
    {
        name: 'Orthopedic Surgeons',
        doctors: [
          {
            name: 'Dr. Alexander Smith',
            image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?t=st=1714932576~exp=1714936176~hmac=d4a08cce72d130200e4328040443b99381fb8c8646b396b2c356d7f8272ebfba&w=740',
            details: 'Specializes in treating musculoskeletal injuries and performing joint replacement surgeries.',
          },
          {
            name: 'Dr. Jennifer White',
            image: 'https://img.freepik.com/premium-photo/portrait-smiling-handsome-male-doctor-man_485089-24.jpg?w=360',
            details: 'Experienced in arthroscopic procedures for sports injuries and minimally invasive surgeries.',
          },
          {
            name: 'Dr. Daniel Brown',
            image: 'https://img.freepik.com/free-photo/portrait-beautiful-young-female-doctor_329181-1163.jpg?t=st=1714932513~exp=1714936113~hmac=47312721b3d9f6297c2e289c139742c5eba7efff06e9e043972daec216a7e799&w=360',
            details: 'Expertise in pediatric orthopedics and treating congenital musculoskeletal conditions.',
          },
          {
            name: 'Dr. Rachel Garcia',
            image: 'https://img.freepik.com/free-photo/confident-senior-doctor-with-clipboard_23-2147896173.jpg?t=st=1714932745~exp=1714936345~hmac=688629e6dbab2230d0e104efe8c652a6e61a6598d690583c1fe09d72777c6c0c&w=360',
            details: 'Specializes in spine surgery for conditions such as herniated discs and scoliosis.',
          },
          {
            name: 'Dr. William Martinez',
            image: 'https://img.freepik.com/free-photo/close-up-doctor-getting-ready-work_23-2149152484.jpg?t=st=1714932776~exp=1714936376~hmac=e6e1fc77c9e35925b7579e77b092f93302b2635f24efc4793b9f2d39f7b05e92&w=360',
            details: 'Provides comprehensive care for patients with fractures and orthopedic trauma.',
          },
        ],
      },
      {
        name: 'Neurologists',
        doctors: [
          {
            name: 'Dr. Samantha Johnson',
            image: 'https://img.freepik.com/free-photo/nurse-with-stethoscope-white-medical-uniform-white-protective-sterile-mask_179666-205.jpg?t=st=1714932622~exp=1714936222~hmac=92540825e0b3f037ef70a9c6616f8b34d379f243ac19b0bc0cf71e422f30fa24&w=360',
            details: 'Specializes in diagnosing and treating neurological disorders such as multiple sclerosis and epilepsy.',
          },
          {
            name: 'Dr. Andrew Wilson',
            image: 'https://img.freepik.com/premium-photo/male-doctor-portrait_23-2148827722.jpg?w=360',
            details: 'Experienced in neurophysiology and performing nerve conduction studies and electromyography.',
          },
          {
            name: 'Dr. Jessica Lee',
            image: 'https://img.freepik.com/premium-photo/close-up-doctor-getting-ready-work_23-2149152528.jpg?w=360',
            details: 'Expertise in movement disorders including Parkinson\'s disease and essential tremor.',
          },
          {
            name: 'Dr. Christopher Brown',
            image: 'https://img.freepik.com/free-photo/nurse-portrait-hospital_23-2150780330.jpg?t=st=1714932890~exp=1714936490~hmac=aa4e7b7911349aa85007f82848835e4b62f877af0a5ef9b6d5526698dfcf29cf&w=360',
            details: 'Specializes in neurocritical care for patients with acute brain injuries and strokes.',
          },
          {
            name: 'Dr. Emily Taylor',
            image: 'https://img.freepik.com/free-photo/portrait-young-successful-female-surgeon-with-stethoscope-isolated_186202-1270.jpg?t=st=1714932857~exp=1714936457~hmac=04ce84e284d9d1d4bf20a146834f150cb7c1515bd448e34b27e5e25fd3fea442&w=360',
            details: 'Provides comprehensive care for patients with Alzheimer\'s disease and other cognitive disorders.',
          },
        ],
      },
      {
        name: 'Ophthalmologists',
        doctors: [
          {
            name: 'Dr. Ethan Martinez',
            image: 'https://img.freepik.com/free-photo/front-view-smiley-male-doctor_23-2148453484.jpg?t=st=1714932910~exp=1714936510~hmac=0277461289cd694bac9689d99f129836c62c0ff7291a4aab22d3e940d49f57db&w=360',
            details: 'Specializes in treating eye diseases such as glaucoma and diabetic retinopathy.',
          },
          {
            name: 'Dr. Sophia Garcia',
            image: 'https://img.freepik.com/premium-photo/side-view-smiley-female-doctor_23-2148453487.jpg?w=360',
            details: 'Experienced in performing cataract surgery and refractive procedures like LASIK.',
          },
          {
            name: 'Dr. Noah Johnson',
            image: 'https://img.freepik.com/premium-photo/portrait-experienced-therapistisolated-white_160672-27685.jpg?w=360',
            details: 'Expertise in pediatric ophthalmology and treating childhood eye conditions.',
          },
          {
            name: 'Dr. Ava Brown',
            image: 'https://img.freepik.com/premium-photo/doctor-woman-happy-cheerful-while-standing-hospital-office-highlight-background-medicine-healthcare-concept_735658-1759.jpg?w=360',
            details: 'Specializes in corneal transplantation and managing corneal diseases.',
          },
        //   {
        //     name: 'Dr. Samuel Wilson',
        //     image: 'https://example.com/doctor25.jpg',
        //     details: 'Provides comprehensive eye care including routine exams and vision correction.',
        //   },
        ],
      },
    // Add more specialties here
  ];
  
  
  
  return (
    <div className='main-div'>
      {specialties.map((specialty, index) => (
        <div key={index} style={{ textAlign: 'center', marginBottom: '30px', marginLeft:'auto' }}>
          <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
            {specialty.name}
          </Typography>
          <div className="doctors" style={{ textAlign: 'center', marginBottom: '30px', marginLeft:'auto' }}>
            {specialty.doctors.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      ))}
      <style>
        {`
            .main-div {
                margin-top: 35px;
            }
          .doctors {
            display: flex;
            justify-content: center;
            gap: 20px;
            overflow-x: auto;
            padding: 20px 0;
          }

          .doctors::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

const DoctorContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '200px',

  });
  
  const DoctorCard = ({ doctor }) => {
    return (
    <Container>
      <CustomCard>
      <CardMedia
  component="img"
  height="200"
  image={doctor.image}
  alt={doctor.name}
  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
/>

        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            {doctor.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{ fontSize: '16px' }}>
            {doctor.details}
          </Typography>
        </CardContent>
      </CustomCard>
    </Container>
    );
  };
  
  const CustomCard = styled(Card)(({ theme }) => ({
    marginLeft:'-10px',
    marginRight:'-110px',
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }));
  
  export default SpecialtyDoctorsSlideshow;