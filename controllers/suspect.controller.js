import { Suspect } from "../models/Suspect.js";

export const getIncidents = async (req, res) => {
  const cursosConIncidencias = await Suspect.aggregate([
    {
      $unwind: "$sospechosos",
    },
    {
      $group: {
        _id: "$course",
        totalSospechosos: { $sum: 1 },
      },
    },
  ]);

  console.log("Cursos con mayores incidencias de sospechosos:");
  console.log(cursosConIncidencias);
  var arraynumero = [];
  var arraytitles = [];
  cursosConIncidencias.forEach((cursoi) => {
    arraynumero.push(cursoi.totalSospechosos);
    arraytitles.push(cursoi._id.toString());
  });
  console.log(arraynumero);
  console.log(arraytitles);
  var objetodatos = { datos: arraynumero };
  console.log(objetodatos);

  return res.status(200).json({ data: arraynumero, headers: arraytitles });
};
