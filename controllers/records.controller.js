import { Record } from "../models/Record.js";


//general data charts
export const getactivityforDay=async(req,res)=>{
  const activityforday= await Record.aggregate([
    {
        $project: {
            dayOfWeek: { $dayOfWeek: { $toDate: "$_id" } }, 
            data: 1 
        }
    },
    {
        $group: {
            _id: "$dayOfWeek",
            count: { $sum: 1 },
            
        }
    },
    {
        $sort: { _id: 1 } 
    }
]);
  console.log(activityforday);
  return res.status(200).json(activityforday);
  
}

export const getactivityforhour=async(req,res)=>{
  const activityforhour= await Record.aggregate([
    {
        $project: {
            hour: { $hour: { $toDate: "$_id" } } // Extraer la hora del campo _id
        }
    },
    {
        $group: {
            _id: "$hour",
            count: { $sum: 1 }
        }
    },
    {
        $sort: { _id: 1 } // Ordenar por la hora
    }
]);
  console.log(activityforhour);
  return res.status(200).json(activityforhour);

}

//end general data charts

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
        "answers": answer,
        "date": date
      }
    },
    {
      $group: {
        _id: "$username",     
        times: { $addToSet: "$time" }
      }
    },
    {
      $project: {
        _id: 0,
        username: "$_id",
        numTiempos: { $size: "$times" } // Obtener el tamaño del array de tiempos
      }
    },
    {
      $sort: {
        numTiempos: 1 // Ordenar por username en orden ascendente
      }
    }
  ]);

  const usernames = getAllSuspects.map(item => item.username);
  const numTiempos = getAllSuspects.map(item => item.numTiempos);

  console.log(usernames,numTiempos);
  console.log(getAllSuspects);
  return res.status(200).json({usernames:usernames,timeincidents:numTiempos});

}


export const getAllAnswersByCourse=async(req,res)=>{
  const {course}=req.body;
  const answersByCourse= await Record.distinct("answers", { "course": course });
  console.log(answersByCourse);
  return res.status(200).json({answersByCourse});
}


export const getAllDatesByCourse=async(req,res)=>{
  const {course ,answer}=req.body;
  const courseDates=await Record.aggregate([
    {
      $match: {
        "course": course,
        "answers": answer
      }
    },
    {
      $group: {
        _id: "$date"
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id"
      }
    },
    {
      $sort: {
        date: 1 
      }
    }
  ]);
  const dates = courseDates.map(item => item.date);
  console.log(dates);
  return res.status(200).json(dates);
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