import TabItem from '../TabItem'
import './index.css'

const Tablist = props => {
  const {tabList, activeTab, changeActiveTab} = props

  return (
    <ul className="tab-list">
      {tabList.map(tabDetails => (
        <TabItem
          tabDetails={tabDetails}
          activeTab={activeTab}
          key={tabDetails.menuCategoryId}
          changeActiveTab={changeActiveTab}
        />
      ))}
    </ul>
  )
}

export default Tablist
