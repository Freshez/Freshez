import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

function PostForm({ addPost }) {
  const [text, setText] = useState('');
  const [header, setHeader] = useState('');
  const [img, setImg] = useState('');

  const imgChange = (e) => {
    if (e.target.files.length > 0) {
      const upload_file = e.target.files[0];
      console.log(upload_file);
      console.log(upload_file.name);
      setImg(e.target.value);
    }
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ header, img, text });
          setText('');
          setHeader('');
          setImg('');
        }}
      >
        <input
          className='input-header'
          type='text'
          placeholder='Header'
          name='header'
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <input
          type='file'
          id='img'
          accept='image/png, image/jpeg'
          name='img'
          value={img}
          onChange={(e) => imgChange(e)}
          required
        />
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostForm);
