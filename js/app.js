App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Student = DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	fullName: (function(){
		return this.get('firstName') + " " + this.get('lastName');
	}).property('firstName', 'lastName')
});

App.Student.FIXTURES = [
	{
		id: 1,
		firstName: 'Harry',
		lastName: 'Potter'
	},
	{
		id: 2,
		firstName: 'Ronald',
		lastName: 'Weesley'
	}
]

App.Router.map(function() {
  this.resource('students', function(){
  	this.route('show', {path: '/:student_id'});
  });
});

App.StudentsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('student');
	}
});

App.StudentsShowRoute = Ember.Route.extend({
	model: function(params){
		return App.Student.find(params.student_id);
	}
});