import axios from "axios";

export default async function removeContainer(name) {
 axios.delete(`${process.env.BENDER_URL}/bridges/${name}`);
}