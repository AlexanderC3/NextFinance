import { Category } from "@prisma/client"

function CategoryRow({category} : {category : Category}) {
  return (
    <div className="flex items-center gap-y-20">
        <span role="img">{category.icon}</span>
        <span>{category.name}</span>
    </div>
  )
}

export default CategoryRow