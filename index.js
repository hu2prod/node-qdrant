const { body_request, url_request } = require("./request.js");

const base_url = "http://localhost:6333/";

const Qdrant = function(url){
	this.url = url||base_url;
};

//DELETE http://localhost:6333/collections/{collection_name}
Qdrant.prototype.delete_collection = async function (name) {
	let qdrant_url = this.url;
	let url = `${qdrant_url}collections/${encodeURIComponent(name)}`;
	return body_request(url,null,'DELETE');
}

//PUT http://localhost:6333/collections/{collection_name}
Qdrant.prototype.create_collection = async function (name,body) {
	let qdrant_url = this.url;
	let url = `${qdrant_url}collections/${encodeURIComponent(name)}`;
	return body_request(url,{vectors:body},'PUT');
}

//GET http://localhost:6333/collections/{collection_name}
Qdrant.prototype.get_collection = async function (name) {
	let qdrant_url = this.url;
	let url = `${qdrant_url}collections/${encodeURIComponent(name)}`;
	return url_request(url);
}


//PUT http://localhost:6333/collections/{collection_name}/points
Qdrant.prototype.upload_points = async function (name,points) {
	let qdrant_url = this.url;
	let url = `${qdrant_url}collections/${encodeURIComponent(name)}/points`;	
	return body_request(url,{points:points},'PUT');
}

//POST http://localhost:6333/collections/{collection_name}/points/search
Qdrant.prototype.search_collection = async function (name,vector,k,ef,filter) {
	k = k || 5;
	ef = ef || 128;
	let qdrant_url = this.url;
	let url = `${qdrant_url}collections/${encodeURIComponent(name)}/points/search`;
	let query = {
		"params": {
			"hnsw_ef": ef
		},
		"vector": vector,
		"top": k,
		"with_payload": true
	};
	if (filter) query.filter = filter;
	return body_request(url,query,'POST');
}


//Same as search_collection but allows free-form query by the client
Qdrant.prototype.query_collection = async function (name,query) {
	let qdrant_url = this.url;
	let url = `${qdrant_url}collections/${encodeURIComponent(name)}/points/search`;
	return body_request(url,query,'POST');
}

//Get the specific points by ids
Qdrant.prototype.retrieve_points = async function (name,query) {
	let qdrant_url = this.url;
	let url = `${qdrant_url}collections/${encodeURIComponent(name)}/points`;
	return body_request(url,query,'POST');
}

module.exports = Qdrant
