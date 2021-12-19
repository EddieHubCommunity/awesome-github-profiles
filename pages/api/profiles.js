import data from "../../.cache/data.json";

export default function handler(req, res) {
  res.status(200).json(data)
}
