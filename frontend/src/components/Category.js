import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { category } from "../features/category/categorySlice";
function Category() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(category(text))
        
        setText('')
    }
  return (
    <div>
        <section className='heading'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Category Name</label>
                    <input type='text' name='text' id='text' value={text} onChange={(e)=>setText(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='text'>Status</label>
                    <input type='text' name='text' id='text' value={text} onChange={(e)=>setText(e.target.value)} />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block'>Add</button>
                </div>
            </form>
        </section>
    </div>
  )
}

export default Category