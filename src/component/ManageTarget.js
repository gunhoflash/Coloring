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
		this.event_target1_save    = this.event_target1_save.bind(this);
		this.event_target2_save    = this.event_target2_save.bind(this);
		this.show_target_info      = this.show_target_info.bind(this);
		console.log(this.props.user_info);
	}

	event_register_target(target_number, name, age, sex, grade, relationship) {
		if (!name || !age || !sex || !grade || !relationship) {
			alert('invalid inputs');
			return;
		}
		console.log(`register: ${name}, ${age}, ${sex}, ${grade}, ${relationship}`);
		$.post('http://' + window.location.hostname + ':5000/manageTarget', {
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
				this.props.update_target(target_number, response.target);
				this.show_target_info();
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

	show_target_info() {
		const t1 = this.props.user_info.target1; 
		const t2 = this.props.user_info.target2; 
		let hashed1, hashed2, name1, name2, age1, age2, sex1, sex2, grade1, grade2, relationship1, relationship2, button1, button2;

		hashed1       = t1 ? t1.hashed       :         '';
		name1         = t1 ? t1.name         :         '';
		age1          = t1 ? t1.age          :          0;
		sex1          = t1 ? t1.sex          :         '';
		grade1        = t1 ? t1.grade        :         '';
		relationship1 = t1 ? t1.relationship :         '';
		button1       = t1 ? 'save'          : 'register';

		hashed2       = t2 ? t2.hashed       :         '';
		name2         = t2 ? t2.name         :         '';
		age2          = t2 ? t2.age          :          0;
		sex2          = t2 ? t2.sex          :         '';
		grade2        = t2 ? t2.grade        :         '';
		relationship2 = t2 ? t2.relationship :         '';
		button2       = t2 ? 'save'          : 'register';

		$('#input_target1_name').val(name1);
		$('#input_target2_name').val(name2);
		$('#input_target1_age').val(age1);
		$('#input_target2_age').val(age2);
		$('#input_target1_sex').val(sex1);
		$('#input_target2_sex').val(sex2);
		$('#input_target1_grade').val(grade1);
		$('#input_target2_grade').val(grade2);
		$('#input_target1_relationship').val(relationship1);
		$('#input_target2_relationship').val(relationship2);
		$('#target1_hashed').text(hashed1);
		$('#target2_hashed').text(hashed2);
		$('#button_target1_save').text(button1);
		$('#button_target2_save').text(button2);
	}

	componentDidMount() {
		this.show_target_info();
	}

	render () {
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
						/>
						<Input
							title = "target1_age"
							type = "number"
						/>
						<Input
							title = "target1_sex"
							type = "text"
						/>
						<Input
							title = "target1_grade"
							type = "text"
						/>
						<Input
							title = "target1_relationship"
							type = "text"
						/>
						<p>
							<label>hashed url</label>
							<span id="target1_hashed"></span>
						</p>
						<Button
							id = "target1_save"
							content = ''
							onClick = {this.event_target1_save}
						/>
					</div>
					<div>
						<p>Target 2</p>
						<Input
							title = "target2_name"
							type = "text"
						/>
						<Input
							title = "target2_age"
							type = "number"
						/>
						<Input
							title = "target2_sex"
							type = "text"
						/>
						<Input
							title = "target2_grade"
							type = "text"
						/>
						<Input
							title = "target2_relationship"
							type = "text"
						/>
						<p>
							<label>hashed url</label>
							<span id="target2_hashed"></span>
						</p>
						<Button
							id = "target2_save"
							content = ''
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
	update_target: PropTypes.func.isRequired,
	goto: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired
};

export default ManageTarget;