// TODO: load target datas and save(change) it
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Bfore from './Bfore.js';
import Input from './Input.js';
import Button from './Button.js';

class ManageTarget extends React.Component {

	constructor(props) {
		super(props);
		this.event_register_target = this.event_register_target.bind(this);
		this.event_target1_save = this.event_target1_save.bind(this);
		this.event_target2_save = this.event_target2_save.bind(this);
		this.target1 = this.props.user_info.target1;
		this.target2 = this.props.user_info.target2;
		console.log(this.props.user_info);
	}

	event_register_target(target_number, name, age, sex, grade, relationship) {
		if (!name || !age || !sex || !grade || !relationship) {
			alert('invalid inputs');
			return;
		}
		console.log(`register: ${name}, ${age}, ${sex}, ${grade}, ${relationship}`);
		$.post('http://localhost:5000/manageTarget', {
			target_number: target_number,
			name         : name,
			age          : age,
			sex          : sex,
			grade        : grade,
			relationship : relationship,
			email        : this.props.user_info.email
		}, function (response) {
			alert(response.message);
			if (response.result == 1) {
				this.props.goto('ManageTarget'); // refresh?
			}
		}.bind(this));
	}

	event_target1_save() {
		this.event_register_target(
			1,
			$('#input_target1_name').val(),
			$('#input_target1_age').val(),
			$('#input_target1_sex').val(),
			$('#input_target1_grade').val(),
			$('#input_target1_relationship').val()
		);
	}

	event_target2_save() {
		this.event_register_target(
			2,
			$('#input_target2_name').val(),
			$('#input_target2_age').val(),
			$('#input_target2_sex').val(),
			$('#input_target2_grade').val(),
			$('#input_target2_relationship').val()
		);
	}

	render () {
		let
		relationship1 = this.props.user_info.target1_relationship || '',
		relationship2 = this.props.user_info.target2_relationship || '',
		name1, name2, age1, age2, sex1, sex2, grade1, grade2;

		name1 = name2 = age1 = age2 = sex1 = sex2 = grade1 = grade2 = '';
		if (this.target1 != null) {
			name1 = this.target1.name;
			age1 = this.target1.age;
			sex1 = this.target1.sex;
			grade1 = this.target1.grade;
		}
		if (this.target2 != null) {
			name2 = this.target2.name;
			age2 = this.target2.age;
			sex2 = this.target2.sex;
			grade2 = this.target2.grade;
		}

		return (
			<div className="ManageTarget">
				This is ManageTarget component!
				<Bfore
					goto = {this.props.goto.bind(this)}
				/>
				<div style={{display:'flex'}}>
					<div>
						<p>Target 1</p>
						<Input
							title = "target1_name"
							type = "text"
							value = {name1}
						/>
						<Input
							title = "target1_age"
							type = "number"
							value = {age1}
						/>
						<Input
							title = "target1_sex"
							type = "text"
							value = {sex1}
						/>
						<Input
							title = "target1_grade"
							type = "text"
							value = {grade1}
						/>
						<Input
							title = "target1_relationship"
							type = "text"
							value = {relationship1}
						/>
						<p>
							{(this.target1 == null) ? "" : this.target1.hashed}
						</p>
						<Button
							id = "target1_save"
							content = {(this.target1 == null) ? "register" : "save"}
							onClick = {this.event_target1_save}
						/>
					</div>
					<div>
						<p>Target 2</p>
						<Input
							title = "target2_name"
							type = "text"
							value = {name2}
						/>
						<Input
							title = "target2_age"
							type = "number"
							value = {age2}
						/>
						<Input
							title = "target2_sex"
							type = "text"
							value = {sex2}
						/>
						<Input
							title = "target2_grade"
							type = "text"
							value = {grade2}
						/>
						<Input
							title = "target2_relationship"
							type = "text"
							value = {relationship2}
						/>
						<p>
							{(this.target2 == null) ? "" : this.target2.hashed}
						</p>
						<Button
							id = "target2_save"
							content = {(this.target2 == null) ? "register" : "save"}
							onClick = {this.event_target2_save}
						/>
					</div>
				</div>
			</div>
		)
	}
}

ManageTarget.propTypes = {
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired
};

export default ManageTarget;