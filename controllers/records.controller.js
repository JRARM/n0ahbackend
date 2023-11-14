import { Record } from "../models/Record.js";

export const getallCourses=async(req,res)=>{

  const allCourses= await Record.distinct("course");
  console.log(allCourses);
  return res.status(200).json({courses:allCourses});
}

export const getAllSuspects= async(req,res)=>{
  const {course,answer,date}=req.body;

  const getAllSuspects=await Record.aggregate([
    {
      $match: {
        "course": course,
        "date": date,
        "answers": answer
      }
    },
    {
      $group: {
        _id: {
          course: "$course",
          date: "$date",
          answers: "$answers",
          time: "$time"
        },
        users: { $addToSet: "$username" }
      }
    },
    {
      $project: {
        _id: 0,
        course: "$_id.course",
        date: "$_id.date",
        answers: "$_id.answers",
        time: "$_id.time",
        users: 1
      }
    },
    {
      $sort: {
        course: 1,
        date: 1
      }
    }
  ]);
  console.log(getAllSuspects);
  return res.status(200).json({getAllSuspects});

}


export const getAllAnswersByCourse=async(req,res)=>{
  const {course}=req.body;
  const answersByCourse= await Record.distinct("answers", { "course": course });
  console.log(answersByCourse);
  return res.status(200).json({answersByCourse});
}


export const getAllDatesByCourse=async(req,res)=>{
  const {course }=req.body;
  const courseDates=await Record.distinct("date", { course: course });
  console.log(courseDates);
  return res.status(200).json({courseDates});
}


export const getActivityByUser = async (req, res) => {
  const { userName } = req.body;
  const userActions = await Record.aggregate([
    {
      $match: {
        "username": userName
      }
    },
    {
      $group: {
        _id: "$name",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        count: 1
      }
    }
  ]);
  console.log(userActions);
  const counts = [];
const names = [];

// Recorrer el arreglo original y dividir la información
userActions.forEach(item => {
  counts.push(item.count);
  names.push(item.name);
});

  return res.status(200).json({names:names,counts:counts});
};


export const getUsers= async(req,res)=>{
  const users=await Record.distinct("username");
  console.log(users);
  return res.status(200).json({users:users})
}






















// //trae las acciones y cantidad de un usuario especificio
// db.records.aggregate([
//     {
//       $match: {
//         "username": "Maria_Lugo_Cujar"
      
//       }
//     },
//     {
//       $group: {
//         _id: "$name",
//         count: { $sum: 1 }
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         name: "$_id",
//         count: 1
//       }
//     }
//   ]).toArray();
// //get all usernames  with distinct
//   db.Registrobd.distinct("username");
// ///obtener usernames all
//   db.record.aggregate([
//     {
//       $group: {
//         _id: "$username"
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         username: "$_id"
//       }
//     }
//   ]).toArray();

// //fechas de curso
//   db.records.distinct("date", { course: "MOOC_Unicauca+MOOC_Formacion_VRI+2021-I" });