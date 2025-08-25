import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { SquarePen } from "lucide-react";
import {
  UploadImage,
  GetPanleName,
  GetHeaderImg2,
  GetHeaderImg1,
  GetLogo,
  Getfaviconimage,
} from "../../CommonAPI/Admin";
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import Content from "../../../ExtraComponent/Content";
import NoDataFound from "../../../ExtraComponent/NoDataFound"; // <-- add import

const System = () => {
  const [showModal, setShowModal] = useState(false);
  const [panleName, setPanleName] = useState("");
  const [panleLogo, setPanleLogo] = useState("");
  const [HeaderImg1, setHeaderImg1] = useState("");
  const [HeaderImg2, setHeaderImg2] = useState("");
  const [getfaviconImage, setFaviconImage] = useState("");

  const fetchPanelDetails = async () => {
    try {
      localStorage.removeItem("pannel_name");
      localStorage.removeItem("header_img1");
      localStorage.removeItem("logo");
      localStorage.removeItem("header_img2");
      localStorage.removeItem("fevicon");

      const panelNameRes = await GetPanleName();
      setPanleName(panelNameRes.Status ? panelNameRes.CompanyName : "");
      localStorage.setItem("pannel_name", panelNameRes.CompanyName);

      const headerimage1 = await GetHeaderImg1();
      setHeaderImg1(headerimage1.status ? headerimage1.image_data : "");
      localStorage.setItem(
        "header_img1",
        "data:image/png;base64," + headerimage1.image_data
      );

      const logoRes = await GetLogo();
      setPanleLogo(logoRes.status ? logoRes.image_data : "");
      localStorage.setItem(
        "logo",
        "data:image/png;base64," + logoRes.image_data
      );

      const headerimage2 = await GetHeaderImg2();
      setHeaderImg2(headerimage2.status ? headerimage2.image_data : "");
      localStorage.setItem(
        "header_img2",
        "data:image/png;base64," + headerimage2.image_data
      );

      const faviconImage = await Getfaviconimage();
      setFaviconImage(faviconImage.status ? faviconImage.image_data : "");
      localStorage.setItem(
        "fevicon",
        "data:image/png;base64," + faviconImage.image_data
      );
    } catch (err) {
      console.log("Error fetching panel details", err);
    }
  };

  useEffect(() => {
    fetchPanelDetails();
  }, []);

  const ReloadFun = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const fields = [
    {
      name: "PanelName",
      label: "Panel Name",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "logo",
      label: "Logo",
      type: "file1",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "header_img1",
      label: "Header Img1",
      type: "file1",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "header_img2",
      label: "Header Img2",
      type: "file1",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "favicon",
      label: "Favicon",
      type: "file1",
      label_size: 12,
      col_size: 6,
    },
  ];

  const formik = useFormik({
    initialValues: {
      header_img2: "",
      header_img1: "",
      logo: "",
      PanelName: "",
      favicon: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.header_img1) errors.header_img1 = "Please Select header img1";
      if (!values.header_img2) errors.header_img2 = "Please Select header img2";
      if (!values.logo) errors.logo = "Please Select Logo";
      if (!values.PanelName) errors.PanelName = "Please Enter Panel Name";
      if (!values.favicon) errors.favicon = "Please Select Favicon";
      return errors;
    },
    onSubmit: async (values) => {
      const data = {
        icon: values.header_img1,
        frontimage: values.header_img2,
        logo: values.logo,
        company_name: values.PanelName,
        favicon: values.favicon,
      };
      try {
        const response = await UploadImage(data);
        if (response.Status) {
          Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            icon: "success",
            title: "Success",
            text: "Data Added Successfully",
          });
          setShowModal(false);
          formik.resetForm();
          fetchPanelDetails();
          // window.location.reload();
          ReloadFun();
        } else {
          Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            icon: "error",
            title: "Error",
            text: "Data Not Added",
          });
        }
      } catch (err) {
        console.error("Error in Adding Data", err);
        Swal.fire({
          // background: "#1a1e23 ",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          icon: "error",
          title: "Error",
          text: "An error occurred while adding data.",
        });
      }
    },
  });

  return (
    <>
      {/* Heading for System Details */}
      <div className="d-flex align-items-center mb-4 p-3 rounded border border-2 border-primary-subtle">
        <h2 className="mb-0 me-3 d-flex align-items-center text-body">
          <i className="bi bi-gear-fill me-2 text-primary fs-4"></i>
          <span className="fw-semibold fs-4 card-text-Color">1. System Details</span>
        </h2>
        <div className="flex-grow-1 border-bottom border-2 opacity-50 border-primary-subtle"></div>
      </div>
      {/* Show NoDataFound if all data is missing */}
      {!panleName && !getfaviconImage && !HeaderImg1 && !HeaderImg2 && !panleLogo ? (
        <div>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <button className="btn btn-primary shadow rounded-pill px-4 py-2 fw-bold" onClick={() => setShowModal(true)}>
              <i className="bi bi-plus-circle me-2"></i>Add Panel
            </button>
          </div>
          <NoDataFound />
        </div>
      ) : (
        <div className="card  border-0 mb-4">
          <div className="card-body p-4">
            <div className="table-responsive border-1 rounded-3 shadow-sm">
              <table className="table table-hover align-middle text-center mb-0">
                <thead className="card-bg-color">
                  <tr>
                    <th scope="col">SR. No</th>
                    <th scope="col">Panel Name</th>
                    <th scope="col">Favicon</th>
                    <th scope="col">Header Image1</th>
                    <th scope="col">Header Image2</th>
                    <th scope="col">Login Image</th>
                    <th scope="col">Update</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td className="fw-semibold">{panleName}</td>
                    <td>
                      {getfaviconImage && (
                        <img
                          src={`data:image/png;base64,${getfaviconImage}`}
                          className="img-thumbnail rounded-circle border border-2 border-primary shadow-sm"
                          alt="Panel Favicon"
                          style={{ width: "60px", height: "60px", objectFit: "contain", background: "#fff" }}
                        />
                      )}
                    </td>
                    <td>
                      {HeaderImg1 && (
                        <img
                          src={`data:image/png;base64,${HeaderImg1}`}
                          className="img-thumbnail rounded border border-2 border-info shadow-sm"
                          alt="Panel Icon"
                          style={{ width: "60px", height: "60px", objectFit: "contain", background: "#fff" }}
                        />
                      )}
                    </td>
                    <td>
                      {HeaderImg2 && (
                        <img
                          src={`data:image/png;base64,${HeaderImg2}`}
                          className="img-thumbnail rounded border border-2 border-success shadow-sm"
                          alt="Panel Front Image"
                          style={{ width: "60px", height: "60px", objectFit: "contain", background: "#fff" }}
                        />
                      )}
                    </td>
                    <td>
                      {panleLogo && (
                        <img
                          src={`data:image/png;base64,${panleLogo}`}
                          className="img-thumbnail rounded border border-2 border-warning shadow-sm"
                          alt="Panel Logo"
                          style={{ width: "60px", height: "60px", objectFit: "contain", background: "#fff" }}
                        />
                      )}
                    </td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm rounded-circle shadow" title="Update Panel" onClick={() => setShowModal(true)}>
                        <SquarePen size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="modal fade show d-flex align-items-center justify-content-center"
          role="dialog"
          style={{ display: "block", background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 shadow-lg border-0">
              <div className="modal-header border-0 pb-0">
                <h3 className="modal-title fw-bold text-primary">🔄 Update Panel</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    formik.resetForm();
                  }}
                ></button>
              </div>
              <div className="modal-body py-4">
                <AddForm fields={fields} btn_name="Update" formik={formik} />
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default System;
