import axios from "axios";

export const getLinks = () => axios.get("http://localhost:8080/data/links");
