const GenderCheckbox = ({onCheckBoxChange,selectedGender}) => {
	// checked=This checks if selectedGender is equal to "male". If so, the checkbox is set to checked.
	// onchange=if checked male it will send the argument "male"  to onCheckBoxChange->handleCheckBoxChange in (gender=male)
	// and the handleCheckBoxChange funtion will sets the gender to male
	return (
		<div className='flex'> 
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender==='male' ? "selected":""}`}>
					<span className='label-text'>Male</span>
					<input 
					    type='checkbox' 
					    className='checkbox border-slate-900'
                        checked={selectedGender==='male'}
						onChange={()=>onCheckBoxChange("male")}
					 />  
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender==='female' ? "selected":""}`}>
					<span className='label-text'>Female</span>
					<input 
					   type='checkbox' 
					   className='checkbox border-slate-900'
					   checked={selectedGender==='female'}
					   onChange={()=>onCheckBoxChange("female")}
					 />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
