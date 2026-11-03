import spinbikes from "../assets/spinbikes.jpg";
import puregym from '../assets/puregym.jpg';
import boxingcoaching from '../assets/boxingcoaching.jpg';
import coachassessment from '../assets/coachassessment.jpg';
import rowingmachines from '../assets/rowingmachines.jpg';



const trainer=[
{
    names: 'JudithLethuwa',
    subtitle:'Strength & Conditioning',
    description:'Ex-rugby player turned coach. Builds strength that actually carries over to real life',
    subheader:"Mon / Wed / Fri",
    images:{
        jpg:spinbikes 
    }
},
 {
   names: 'Ayomikun',
     subtitle:'Body Strength &amp; Muscle Workout',
     description:'Builds a body that actually carries over to real life.',
    subheader:"Thu / Fri / Sat",
      images:{
        jpg:puregym
    }
 },
  {
   names: 'Aamir Gazian',
     subtitle:'HIIT &amp; Cardio',
     description:'Fast, sweaty, fun. His 6am sessions are the reason people stop hitting snooze.',
    subheader:"Tue / Thu / Sat",
       images:{
        jpg:boxingcoaching
    }
 },
   {
   names: 'Hazem',
     subtitle:'Yoga &amp; Mobility',
     description:'Helps desk-bound bodies move properly again. Calm energy, zero ego.',
    subheader:"Daily evenings",
       images:{
        jpg:coachassessment
    }
 },
  {
   names: 'Matthew Sheldon',
     subtitle:'Boxing Fitness',
     description:'Pads, bags and footwork. No fighting experience needed, just show up.',
    subheader:"Wed / Sat",
       images:{
        jpg:rowingmachines 
    }
 }
    


]
export default trainer