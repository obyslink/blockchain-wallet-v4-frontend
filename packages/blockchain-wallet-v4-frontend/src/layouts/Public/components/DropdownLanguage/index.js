import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { actions, selectors } from 'data'
import { languagesSortedByName } from 'services/LocalesService'
import { SimpleDropdown } from 'blockchain-info-components/src/Dropdowns'

class DropdownLanguageContainer extends React.PureComponent {
  handleClick = selectedLanguage => {
    this.props.preferencesActions.setCulture(selectedLanguage.value)
    this.props.preferencesActions.setLanguage(selectedLanguage.language, true)
  }

  render () {
    const { currentLanguage, languages, color, size } = this.props
    const languageList = languages.map(lang => {
      return {
        text: lang.name,
        value: lang.language,
        language: lang.language
      }
    })

    return (
      <SimpleDropdown
        color={color || 'whiteFade900'}
        uppercase={false}
        items={languageList}
        selectedValue={currentLanguage}
        size={size}
        callback={selectedLanguage => this.handleClick(selectedLanguage)}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentLanguage: selectors.preferences.getLanguage(state),
  languages: languagesSortedByName
})

const mapDispatchToProps = dispatch => ({
  preferencesActions: bindActionCreators(actions.preferences, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownLanguageContainer)
