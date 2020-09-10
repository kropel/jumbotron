import express, { Request, Response, Application, NextFunction } from "express";
import mongoose from "mongoose";
import EmployeeModel, { IEmployee } from "./models/employee.model";
import cors from "cors";

require("dotenv").config();

mongoose.connect(`${process.env.MONGODB_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get(
  "/employees",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: { _id?: mongoose.Types.ObjectId } = req.query;

      if (query._id && mongoose.Types.ObjectId.isValid(query._id)) {
        query._id = mongoose.Types.ObjectId(`${query["_id"]}`);
      }

      const response = await EmployeeModel.find(query);

      res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

app.get(
  "/employees/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await EmployeeModel.findById(id);
      res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

app.post(
  "/employees",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee: IEmployee = req.body;
      console.log(employee);
      const newEmployee = new EmployeeModel({ ...employee });
      const response = await newEmployee.save();
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  }
);

app.patch(
  "/employees/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await EmployeeModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

app.delete(
  "/employees/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await EmployeeModel.findByIdAndDelete(id);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error:", error);
  res.send(`There was na error: ${error.message}`);
});

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
