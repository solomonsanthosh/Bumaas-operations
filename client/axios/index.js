import  axios  from "axios";

export const getOrders = async (status) => {
  console.log(status);
  return await axios.get(`http://192.168.0.103:8090/getorders/${status}`)
};
export const getOrderDetails = async (project_name) => {
    await axios.get(`http://localhost:8090/getorderdetails/${project_name}`).then((res) => {
      console.log(res);
      res.json(res);
    });
  };