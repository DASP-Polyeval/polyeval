
import Rating from "../Rating/Rating";
function DataTable() {
    const data = [
        { id: 1, srclang: "Lorem ipsum dolor sit amet, consectetuer adipiscing el.", trglang: "تمثیلی خیالی از دیدار جهانگیرشاه. در این تصویر جهانگیر مقتدرتر نشان داده شده‌است و شیری زیر پای اوست", rating: "" },
        { id: 2, srclang: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.", trglang: "يحددان من أنتبرك، عندما لا تملك شي أخلاقك، عندما تملك كل شي", rating: " " },
        { id: 3, srclang: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.", trglang: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit", rating: "" },
        { id: 4, srclang: "تمثیلی خیالی از دیدار جهانگیرشاه (پادشاه گورکانیان هند) و شاه عباس (پادشاه ایران صفوی) اثر ابوالحسن و در سبک نگارگری گورکانی. در حالی که شاه عباس بر سر بزی ایستاده است", trglang: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit", rating: "" },
    ];

return (
    <div className="container">
        
        <table border="1" style={{ borderCollapse: "collapse", width: "90%" }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Source Language</th>
                    <th>Target Language</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.srclang}</td>
                        <td>{row.trglang}</td>
                        <td>{<Rating />}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
} 
export default DataTable;