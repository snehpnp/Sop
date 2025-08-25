import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AddOnPlan, AddPlan, AdminProfile, GetAllStratgy, getChartingStrategyTag } from '../../CommonAPI/Admin';
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Content from '../../../ExtraComponent/Content';
import { use } from 'react';


// Custom multi-select component
const CustomMultiSelect = ({ label, options, selected, onChange, disabled }) => {
    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: 'black',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
    };


    return (
        <div className="col-lg-6">
            <h6>{label}</h6>
            <Select
                isMulti
                options={options}
                value={selected}
                onChange={onChange}
                isDisabled={disabled}
                styles={customStyles}
            />
            <div></div>
        </div>
    );
};

const AddPlanPage = () => {
    const navigate = useNavigate();
    const [selecteOptions, setSelecteOptions] = useState([]);
    const [selecteScalping, setSelecteScalping] = useState([]);
    const [selectePattern, setSelectePattern] = useState([]);
    const [selectedCharting, setSelectedCharting] = useState([]);
    const [selectedStrategyTags, setSelectedStrategyTags] = useState([]); // State for selected strategy tags

    const [scalpingStratgy, setScalpingStratgy] = useState([]);
    const [OptionStratgy, setOptionStratgy] = useState([]);
    const [PatternStratgy, setPatternStratgy] = useState([]);
    const [strategyTags, setStrategyTags] = useState([]); // State for strategy tag options
    const [adminProfile, setAdminProfile] = useState(null);
    const adminPermission = localStorage.getItem("adminPermission");

    const [planOptionArr, setPlanOptionArr] = useState([{ value: "Scalping", label: "SOP" }]);

    const selectedPlanTab = sessionStorage.getItem("SelectedPlanTab");

    useEffect(() => {
        if (adminPermission?.includes("ChartingPlatform")) {
            setPlanOptionArr((prev) => [...prev, { value: "Charting", label: "Charting" }]);
        }
        if(true) {
            setPlanOptionArr((prev) => [...prev, { value: "AddOn", label: "AddOn" }]);
        }
    }, []);

    useEffect(() => {
        GetScalpingStratgy();
        fetchStrategyTags();
    }, []);

    const fetchStrategyTags = async () => {
        try {
            const res = await getChartingStrategyTag();
            if (res && res.data) {
                const tags = res.data.map((tag) => ({
                    value: tag.Strategytag,
                    label: tag.Strategytag,
                }));
                setStrategyTags(tags); // Store fetched strategy tags in state
            }
        } catch (err) {
            showError("Failed to fetch strategy tags");
        }
    };

    const GetScalpingStratgy = async () => {
        try {
            const response = await GetAllStratgy();
            if (response.Status) {
                setScalpingStratgy(Object.values(response.Scalping));
                setPatternStratgy(Object.values(response.Pattern));
                setOptionStratgy(Object.values(response.Option));
            } else {
                showError("Failed to fetch strategies", response.message);
            }
        } catch (err) {
            showError("Network error occurred");
        }
    };

    const showError = (title, message = "") => {
        Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: title,
            text: message || "An error occurred.",
            icon: "error",
            timer: 1500,
            timerProgressBar: true
        });
    };

    const fetchAdminDetials = async () => {
        try {
            const response = await AdminProfile()
            setAdminProfile(response.Data[0]);
        } catch (err) {
            showError("Network error occurred");
        }
    }

    useEffect(() => {
        fetchAdminDetials();
    }, []);




    const formik = useFormik({
        initialValues: {
            NumberofScript: "",
            SOPPrice: 0,
            planname: "",
            Duration: "One_Month",
            PlanType: "Scalping",
            SOPLiveTrade: 0,
            SOPPaperTrade: 0,
            Charting: [],
            ChartPerMonth: "",
            ChartPaperTrade: 0.0,
            Price : 0.0, 
        },

        validate: (values) => {
            const errors = {};

            if (!values.NumberofScript && formik.values.PlanType === "Scalping") {
                errors.NumberofScript = "Please enter the number of scripts.";
            } else if (values.NumberofScript == 0 && formik.values.PlanType === "Scalping") {
                errors.NumberofScript = "Number of scripts cannot be zero.";
            }

            if (formik.values.PlanType !== "AddOn" &&  !values.SOPPrice ) {
                errors.SOPPrice = "Payment is required.";
            } else if (values.SOPPrice == 0) {
                errors.SOPPrice = "Payment cannot be zero.";
            }


            if (formik.values.PlanType !== "AddOn" && !values.planname ) {
                errors.planname = "Please provide a plan name.";
            } else if (!/^[A-Za-z_\s]+$/.test(values.planname.trim())) {
                errors.planname = "Plan name should only contain alphabets, underscores, and spaces (no numbers or special characters).";
            }
 
            if (values.PlanType === "Charting" && (!values.Charting || values.Charting.length === 0)) {
                errors.Charting = "Please select at least one Segment.";
            }


            if (!values.Duration) errors.Duration = "Please select a plan duration.";

            // if (!values.ChartPaperTrade && formik.values.PlanType !== "Scalping") {
            //     errors.ChartPaperTrade = "Please enter the Chart Paper Trade Amount.";
            // }


            return errors;

        },
        onSubmit: async (values) => {
            if (formik.values.PlanType == "Scalping" && selecteScalping.length === 0 && selecteOptions.length === 0 && selectePattern.length === 0) {
                showError("Error!", "Please select at least one strategy either Scalping, Option or Pattern.");
                return;
            }

            const req = {
                Scalping: selecteScalping.map((strategy) => strategy.value),
                Option: selecteOptions.map((strategy) => strategy.value),
                PatternS: selectePattern.map((strategy) => strategy.value),
                NumberofScript: formik.values.PlanType == "Scalping" ? values.NumberofScript : 0,
                planname: values.planname,
                Duration: values.Duration,
                Charting: selectedCharting.map((chart) => chart.value),
                Strategytag: selectedStrategyTags.map((tag) => tag.value), // Pass selected strategy tags
                ...(formik.values.PlanType === "Scalping"
                    ? { SOPPrice: values.SOPPrice, SOPLiveTrade: (values.SOPLiveTrade || 0) }
                    : { ChartPerMonth: values.SOPPrice, SOPPrice: 0, ChartLiveTrade: (values.SOPLiveTrade || 0) }
                ),
                SOPPaperTrade: values.SOPPaperTrade || 0.0,
                ChartPaperTrade: values.ChartPaperTrade || 0.0,
            };

            const reqforAddOn = {
                Price: values.Price || 0.0,
                NumberofScript: values.NumberofScript || 0,
            }

            try {

                if(formik.values.PlanType === "AddOn") {
                    const response = await AddOnPlan(reqforAddOn);
                   
                    if (response.Status) {
                        Swal.fire({
                            // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Success!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            sessionStorage.setItem("redirectPlan", formik.values.PlanType);
                            // navigate('/admin/allplan');
                        }, 1500);
                    }
                }
                else {
                const response = await AddPlan(req);
                if (response.Status) {
                    Swal.fire({
                        // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Success!",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setTimeout(() => {
                        sessionStorage.setItem("redirectPlan", formik.values.PlanType);
                        navigate('/admin/allplan');
                    }, 1500);
                } else {
                    showError("Error!", response.message);
                }
            }
            } catch (err) {
                showError("An unexpected error occurred");
            }


        },
    });

    const handleChartingChange = (selected) => {
        setSelectedCharting(selected);
        formik.setFieldValue("Charting", selected);
    };

    const handleStrategyTagChange = (selected) => {
        setSelectedStrategyTags(selected);
    };

    useEffect(() => {
        formik.setFieldValue("Charting", selectedCharting);
    }, [selectedCharting])


    useEffect(() => {
        if (selectedPlanTab) {
            formik.setFieldValue("PlanType", selectedPlanTab);
        }
    }, [selectedPlanTab]);

    const handleSelectChange = (type, selected) => {
        if (type === "scalping") {
            setSelecteScalping(selected);
            setSelectedCharting([]);
        } else if (type === "option") {
            setSelecteOptions(selected);
            setSelectedCharting([]);
        } else if (type === "pattern") {
            setSelectePattern(selected);
            setSelectedCharting([]);
        }
    };

    const fields = [
        {
            name: "PlanType",
            label: "Plan Type",
            type: "select",
            options: planOptionArr,
            col_size: 6,
        },
        {
            name: "NumberofScript",
            label: "Number of Script",
            type: "text3",
            showWhen: (values) => values.PlanType == "Scalping" || values.PlanType == "AddOn",
            col_size: 6,
        },

         {
            name: "Price",
            label: "Price",
            type: "text3",
            col_size: 6,
        },
        {
            name: "SOPPrice",
            label: "Payment",
            type: "text3",
            col_size: 6,
            showWhen: (values) => values.PlanType !== "AddOn",
        },
        {
            name: "planname",
            label: "Plan Name",
            type: "text",
            col_size: 6,
            showWhen: (values) => values.PlanType !== "AddOn",
        },
        {
            name: "Duration",
            label: "Duration",
            type: "select",
            options: [
                { value: "One_Month", label: "One Month" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Half_Yearly", label: "Half Yearly" },
                { value: "Yearly", label: "Yearly" },
            ],
            col_size: 6,
            showWhen: (values) => values.PlanType !== "AddOn",
        },
        {
            name: "SOPLiveTrade",
            label: "Live Trade Amount",
            type: "text",
            col_size: 6,
            showWhen: (values) => (values.PlanType === "Scalping" && adminProfile?.SOPLiveTrade) || (values.PlanType !== "Scalping" && adminProfile?.ChartLiveTrade),
        },
        {
            name: "SOPPaperTrade",
            label: "Paper Trade Amount",
            type: "text",
            showWhen: () => (formik.values.PlanType === "Scalping" && adminProfile?.SOPPaperTrade),
            col_size: 6,
        },

        {
            name: "ChartPaperTrade",
            label: "Paper Trade Amount",
            type: "text",
            showWhen: () => formik.values.PlanType !== "Scalping" && adminProfile?.ChartPaperTrade,
            col_size: 6,
        },

    ];

    return (

        <Content
            Page_title={" ➕ Add Plan"}
            button_status={false}
            backbutton_status={false}
        >


            <AddForm
                className="admin-add-btn"
                fields={fields.filter((field) => !field.showWhen || field.showWhen(formik.values))}
                btn_name="Add"
                btn_name1="Cancel"
                formik={formik}
                btn_name1_route={"/admin/allplan"}
                additional_field={
                    <>
                        {formik.values.PlanType == "Charting" && (
                            <div className="row" style={{ width: "100%" }}>
                                <div className="col-lg-12 dropdown-multi" style={{ width: '36vw' }}>

                                    <CustomMultiSelect
                                        label={<span className='card-text-Color'>Segment</span>}
                                        options={[
                                            { value: "Cash", label: "Cash" },
                                            { value: "Future", label: "Future" },
                                            { value: "Option", label: "Option" }
                                        ]}
                                        selected={selectedCharting}
                                        onChange={handleChartingChange}
                                    />
                                    {formik.touched.Charting && formik.errors.Charting && (
                                        <div className="text-danger mt-1 small">
                                            {formik.errors.Charting}
                                        </div>
                                    )}

                                </div>
                                <div className="col-lg-12 dropdwown-multi" style={{ width: "48%" }}>
                                    <CustomMultiSelect
                                        label={<span className='card-text-Color stg-label'>Strategy Tag</span>}
                                        options={strategyTags} // Use dynamic strategy tags
                                        selected={selectedStrategyTags}
                                        onChange={handleStrategyTagChange}
                                    />
                                </div>
                            </div>
                        )}
                        {formik.values.PlanType == "Scalping" && (
                            <CustomMultiSelect
                                label={<span className='card-text-Color' >Scalping</span>}
                                options={scalpingStratgy.map(strategy => ({ value: strategy, label: strategy }))}
                                selected={selecteScalping}
                                onChange={(selected) => handleSelectChange("scalping", selected)}
                            />
                        )}

                        {formik.values.PlanType == "Scalping" && (
                            <CustomMultiSelect
                                label={<span className='card-text-Color'>Option</span>}
                                options={
                                    selecteOptions.length === OptionStratgy.length
                                        ? OptionStratgy.map(strategy => ({ value: strategy, label: strategy }))
                                        : [
                                            { value: '__select_all__', label: 'Select All' },
                                            ...OptionStratgy.map(strategy => ({ value: strategy, label: strategy }))
                                        ]
                                }
                                selected={selecteOptions}
                                onChange={(selected) => {
                                    if (selected && selected.find(opt => opt.value === '__select_all__')) {
                                        const allOptions = OptionStratgy.map(strategy => ({ value: strategy, label: strategy }));
                                        setSelecteOptions(allOptions);
                                        setSelectedCharting([]);
                                    } else {
                                        setSelecteOptions(selected);
                                        setSelectedCharting([]);
                                    }
                                }}
                            />
                        )}

                        {formik.values.PlanType == "Scalping" && (
                            <CustomMultiSelect
                                label={<span className='card-text-Color'>Pattern</span>}
                                options={PatternStratgy.map(strategy => ({ value: strategy, label: strategy }))}
                                selected={selectePattern}
                                onChange={(selected) => handleSelectChange("pattern", selected)}
                            />
                        )}
                    </>
                }
            />
        </Content>
    );
};

export default AddPlanPage;
