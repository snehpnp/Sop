import React, { useEffect, useState } from 'react'
import { GETAdminOffer } from "../../CommonAPI/SuperAdmin"
import GridExample from "../../../ExtraComponent/CommanDataTable"
import NoDataFound from '../../../ExtraComponent/NoDataFound'
import Content from '../../../ExtraComponent/Content'

const AdminOffer = () => {
	const [offerData, setOfferData] = useState([])



	const offer = async () => {
		try {
			const res = await GETAdminOffer();
	

			if (res.Status) {
				setOfferData(res?.Data)
			}
		} catch (error) {
			console.error(error);
		}
	};


	const columns = [
		{
			name: "SNo",
			label: "S.No",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (value, tableMeta) => {
					return tableMeta.rowIndex + 1;
				},
			},
		},
		{
			name: "Durtion",
			label: "Duration",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "Price",
			label: "Price (₹)",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "OfferPrice",
			label: "Offer Price (₹)",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "Date",
			label: "Created At",
			options: {
				filter: true,
				sort: true,
			},
		},
	];

	useEffect(() => { offer() }, [])

	return (
		 <Content
			  Page_title={"💼 Admin Offer"}
			  button_status={false}
			//   backbutton_status={true}
			>
		<div className="iq-card-body">
			{offerData && offerData?.length > 0 ? (
				<div className="table-responsive customtable">
					<GridExample
						columns={columns}
						data={offerData}
						checkBox={false}
					/>
				</div>
			) : (
				<NoDataFound />
			)}
		</div>
		</Content>
	)
}

export default AdminOffer
