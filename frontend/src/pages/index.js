import SearchBar from "../components/SearchBar";

export default SearchBar function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Find the Right Doctor</h1>
            <SearchBar/>
        </div>
    );
}