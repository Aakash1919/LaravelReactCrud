import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";

export default function Index({ tasks }) {
    const deleteTask = (id) => {
        Inertia["delete"](route("tasks.destroy", id), {
            onSuccess: () => {
                console.log("Task deleted successfully");
            },
            onError: () => {
                console.log("Error deleting task");
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link
                        href={route("tasks.create")}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        Create
                    </Link>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.data.length > 0 ? (
                                    tasks.data.map((task) => (
                                        <tr
                                            key={task.id}
                                            className="text-center"
                                        >
                                            <td>{task.name}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <Link
                                                    href={route(
                                                        "tasks.edit",
                                                        task.id
                                                    )}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    onClick={() =>
                                                        deleteTask(task.id)
                                                    }
                                                    className="text-red-600 pl-2"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-center">
                                        <td colSpan={3}>No Records Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
