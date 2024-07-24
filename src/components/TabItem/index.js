import './index.css'

const TabItem = props => {
  const {tabDetails, activeTab, changeActiveTab} = props
  const activeTabClassName =
    activeTab === tabDetails.menuCategory ? 'active-tab' : ''
  const onChangeActiveTab = () => changeActiveTab(tabDetails.menuCategory)

  return (
    <li
      className={`tab-item ${activeTabClassName}`}
      onClick={onChangeActiveTab}
    >
      <p>{tabDetails.menuCategory}</p>
    </li>
  )
}

export default TabItem
