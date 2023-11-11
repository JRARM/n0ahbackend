import { Record } from "../models/Record.js";

export const getActivityByUser = async (req, res,username) => {
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