import IEvolveModel from "@/models/IEvolveModel";

export const evolveTitan = async (model: IEvolveModel) => {
  const res = await fetch(`/api/evolve/updateTitan`, {
    method: "POST",
    body: JSON.stringify(model),
    headers: {
      "content-type": "application/json",
    },
  });
  return res.json();
};
