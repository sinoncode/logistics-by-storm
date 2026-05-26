import CommonLink from '@/components/shared/CommonLink';
import RecentLeadsTable from '@/components/tables/RecentLeadsTable';
import TodoListRecentTable from '@/components/tables/TodoListRecentTable';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TodoListRecentCard = () => {
    return (
        <Card className="card !p-0">
            <CardContent className="px-0">
                <Tabs defaultValue="todoList" className="gap-0">
                    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-slate-600">
                       <div className="w-full flex items-center flex-wrap gap-2 justify-between py-4 px-6 border-b border-neutral-200 dark:border-slate-600">
                    <h6 className="mb-0 font-bold text-lg">Recent Shipments</h6>
                    <CommonLink href='/shipment-request'/>
                </div>
                    </div>

                    <div className="p-6">
                        <TabsContent value="todoList">
                            <TodoListRecentTable />
                        </TabsContent>
                        <TabsContent value="recentLeads">
                            <RecentLeadsTable />
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default TodoListRecentCard;