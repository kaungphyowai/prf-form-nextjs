import Header from "../../components/table/header";
import FormEditAccountInfo from "../../components/form/form-edit-account";
import React from "react";

function page() {
  return (
    <>
      <Header justifyContent={"space-between"} />
      <FormEditAccountInfo />
    </>
  );
}

export default page;
