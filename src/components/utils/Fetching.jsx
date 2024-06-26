import axios from "axios";
import useSWR from "swr";

const accessToken = sessionStorage.getItem("token");
// const baseAPIUrl = process.env.REACT_APP_GO_API_URL;
// const pdfAPIUrl = process.env.REACT_APP_PDF_API_URL;
// const baseAPIUrl = "http://localhost:8080";
// const pdfAPIUrl = "http://localhost:8000/api/pdf/sips";

const baseAPIUrl = "http://103.26.13.166:8080";
const pdfAPIUrl = "http://103.26.13.166:8000/api/pdf/sips";

const fetcher = async (url) => {
	const response = await fetch(`${baseAPIUrl}${url}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};

export const postFile = async (endpoint, method, data) => {
	try {
		const response = await axios({
			method,
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "multipart/form-data",
			},
			data: data,
		});
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const postData = async (endpoint, method, data = null) => {
	try {
		const response = await axios({
			method,
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			data: data,
		});
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const deleteAPI = async (endpoint) => {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const fetchAPI = async (endpoint) => {
	try {
		const response = await axios({
			method: "GET",
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const useGetData = (endpoint) => {
	const { data, error, isLoading } = useSWR(endpoint, fetcher);
	return {
		res: data?.data,
		isLoading,
		isError: error,
	};
};

export const pdfAPI = async (endpoint, data) => {
	try {
		const response = await axios({
			method: "POST",
			url: `${pdfAPIUrl}${endpoint}`,
			headers: {
				"Content-Type": "application/pdf",
			},
			responseType: "blob",
			data: data,
		});
		const url = window.URL.createObjectURL(response.data);
		window.open(url, "_blank");
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};
