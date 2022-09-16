import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { setComment } from '../../redux/comments/commentsActions'
import { prepareArticleComment } from '../../helpers/prepareArticleComment'
import { CommentValidation } from '../../schema/validation'
import FormikTextarea from '../FormikTextarea/FormikTextarea'

function NewCommentForm({ dispatchSetComment, replyTo, articleId }) {
  const handleSubmit = ({ text }) => {
    const newComment = prepareArticleComment(text, replyTo, articleId)
    dispatchSetComment(newComment)
  }

  return (
    <Formik
      initialValues={{
        text: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={CommentValidation}
    >
      {() => (
        <Form className="basic-form">
          <FormikTextarea name="text" type="textarea" />
          <button className="basic-form__btn" type="submit">
            {replyTo ? `Reply to: ${replyTo}` : 'Add new comment'}
          </button>
        </Form>
      )}
    </Formik>
  )
}

NewCommentForm.defaultProps = {
  replyTo: null
}

NewCommentForm.propTypes = {
  dispatchSetComment: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  replyTo: PropTypes.string
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetComment: (newComment) => dispatch(setComment(newComment))
})

export default connect(null, mapDispatchToProps)(NewCommentForm)
