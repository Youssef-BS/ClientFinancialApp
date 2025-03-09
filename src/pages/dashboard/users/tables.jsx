import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import UsersTable from "@/components/UsersTable";
import React, { useState } from "react";
import AddUser from "./adduser";

export function Tables() {
  const [addUser, setaddUser] = useState(false);

  const fetchAdd = () => {
    setaddUser(!addUser);
  };
  return (

    <div className="mt-12 mb-8 flex flex-col gap-12">
      <p onClick={fetchAdd} className="cursor-pointer">
        {addUser ? "Hide Form" : "Add User"}
      </p>
      {addUser ? (
        <AddUser />
      ) : (
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Users Table
            </Typography>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2">
            <UsersTable />
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default Tables;
