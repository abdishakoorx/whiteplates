// AppSidebar.jsx
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import CategoryList from "./CategoryList"

function AppSidebar() {
    return (
        <Sidebar className="bg-black border-r">
            <SidebarHeader>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">WhitePlates</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <div className="px-3">
                        <CategoryList />
                    </div>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-4 text-sm text-gray-500">
                    © 2024 WhitePlates
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar