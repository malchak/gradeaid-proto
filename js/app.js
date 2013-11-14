App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

//Models
App.Student = DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	assignments: DS.attr('string'),
	fullName: (function(){
		return this.get('firstName') + " " + this.get('lastName');
	}).property('firstName', 'lastName')
});

App.Assignment = DS.Model.extend({
	subject: DS.attr('string'),
	type: DS.attr('string'),
	title: DS.attr('string'),
	pointsEarned: DS.attr('number'),
	pointsTotal: DS.attr('number')
});
//####################

//Fixtures
App.Student.FIXTURES = [
	{
		id: 1,
		firstName: 'Harry',
		lastName: 'Potter',
	},
	{
		id: 2,
		firstName: 'Ronald',
		lastName: 'Weesley'
	}
];
//######################

//Router
App.Router.map(function() {
  this.resource('students', function(){
  	this.route('show', {path: '/:student_id'});
  	this.route('edit', {path: '/:student_id/edit'});
  });
  this.resource('assignments');
});
//######################

//Routes
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

App.StudentsEditRoute = Ember.Route.extend({
	model: function(params){
		App.Student.find(params.student_id)
	}
});
//#######################

//Controllers
App.StudentsController = Ember.ArrayController.extend({
	actions: {
		createStudent: function(){
			var firstName = this.get('firstName');
			var lastName = this.get('lastName');
			if (!firstName.trim()){return;}
			
			student = this.store.createRecord('student', {
				firstName: firstName,
				lastName: lastName
			});
			this.set('firstName', '');
			this.set('lastName', '');
		}
	}
});

App.StudentsShowController = Ember.ObjectController.extend({
	actions: {
		removeStudent: function(){
			var student = this.get('model');
			if(confirm('Are you sure you want to remove '+student.get('fullName')+'?')){
				student.deleteRecord();
				student.save();
			}
		}
	}
});

App.StudentsEditController = Ember.ObjectController.extend({
	actions: {
		cancel: function(){
			var student = this.get('model');
			student.rollback();
			this.transitionToRoute('students.show', this.content);
		},
		save: function(){
			var student = this.get('model');
			student.save();
			this.transitionToRoute('students.show', this.content);
		}
	}
});
//########################





