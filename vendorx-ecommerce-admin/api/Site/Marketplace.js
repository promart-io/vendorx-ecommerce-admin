var rs = require('http/v3/rs');
var dao = require('vendorx-ecommerce-admin/data/dao/Site/Marketplace');
var http = require('vendorx-ecommerce-admin/api/http');

rs.service()
	.resource('')
		.get(function(ctx, request) {
			var queryOptions = {};
			var parameters = request.getParameterNames();
			for (var i = 0; i < parameters.length; i ++) {
				queryOptions[parameters[i]] = request.getParameter(parameters[i]);
			}
			var entities = dao.list(queryOptions);
			http.sendResponseOk(entities);
		})
	.resource('count')
		.get(function(ctx, request) {
			http.sendResponseOk(dao.count());
		})
	.resource('{id}')
		.get(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
			    http.sendResponseOk(entity);
			} else {
				http.sendResponseNotFound('Marketplace not found');
			}
		})
	.resource('')
		.post(function(ctx, request, response) {
			var entity = request.getJSON();
			entity.Id = dao.create(entity);
			response.setHeader('Content-Location', '/services/v3/js/vendorx-ecommerce-admin/api/Marketplace.js/' + entity.Id);
			http.sendResponseCreated(entity);
		})
	.resource('{id}')
		.put(function(ctx, request) {
			var entity = request.getJSON();
			entity.Id = ctx.pathParameters.id;
			dao.update(entity);
			http.sendResponseOk(entity);
		})
	.resource('{id}')
		.delete(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
				dao.delete(id);
				http.sendResponseNoContent();
			} else {
				http.sendResponseNotFound('Marketplace not found');
			}
		})
.execute();
