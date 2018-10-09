var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'VENDORX_ECOMM_SITE_CONTACT',
	'properties': [
		{
			'name': 'Id',
			'column': 'ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Heading',
			'column': 'HEADING',
			'type': 'VARCHAR',
		}, {
			'name': 'Subheading',
			'column': 'SUBHEADING',
			'type': 'VARCHAR',
		}, {
			'name': 'DetailsHeading',
			'column': 'DETAILSHEADING',
			'type': 'VARCHAR',
		}, {
			'name': 'Street',
			'column': 'STREET',
			'type': 'VARCHAR',
		}, {
			'name': 'City',
			'column': 'CITY',
			'type': 'VARCHAR',
		}, {
			'name': 'State',
			'column': 'STATE',
			'type': 'VARCHAR',
		}, {
			'name': 'Phone',
			'column': 'PHONE',
			'type': 'VARCHAR',
		}, {
			'name': 'Fax',
			'column': 'FAX',
			'type': 'VARCHAR',
		}, {
			'name': 'Email',
			'column': 'EMAIL',
			'type': 'VARCHAR',
		}, {
			'name': 'WorkingHours',
			'column': 'WORKINGHOURS',
			'type': 'VARCHAR',
		}, {
			'name': 'Facebook',
			'column': 'FACEBOOK',
			'type': 'VARCHAR',
		}, {
			'name': 'Linkedin',
			'column': 'LINKEDIN',
			'type': 'VARCHAR',
		}, {
			'name': 'Twitter',
			'column': 'TWITTER',
			'type': 'VARCHAR',
		}, {
			'name': 'Google',
			'column': 'GOOGLE',
			'type': 'VARCHAR',
		}, {
			'name': 'SendHeading',
			'column': 'SENDHEADING',
			'type': 'VARCHAR',
		}, {
			'name': 'SendFullName',
			'column': 'SENDFULLNAME',
			'type': 'VARCHAR',
		}, {
			'name': 'SendPhoneNumber',
			'column': 'SENDPHONENUMBER',
			'type': 'VARCHAR',
		}, {
			'name': 'SendEmailAddress',
			'column': 'SENDEMAILADDRESS',
			'type': 'VARCHAR',
		}, {
			'name': 'SendMessage',
			'column': 'SENDMESSAGE',
			'type': 'VARCHAR',
		}, {
			'name': 'SendButtonText',
			'column': 'SENDBUTTONTEXT',
			'type': 'VARCHAR',
		}]
});
exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM VENDORX_ECOMM_SITE_CONTACT");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};