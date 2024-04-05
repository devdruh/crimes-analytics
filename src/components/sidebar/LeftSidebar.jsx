import LeftSideFilters from "./LeftSideFilters"

const LeftSidebar = () => {
  return (
    <>
      <p className="font-semibold text-center pt-3">Filters</p>
      <div className="divider" />
      <div className="px-2">
        <LeftSideFilters />
      </div>
    </>
  )
}

export default LeftSidebar