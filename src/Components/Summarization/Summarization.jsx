
import Rating from "../Rating/Rating";
function Summarization() {
    const data = [
        { id: 1, reference: "Lorem ipsum dolor sit amet, consectetuer adipiscing el.Lorem ipsum dolor sit amet", summary: "Lorem ipsum dolor sit amet, consectetuer adipiscing el.", rating: "" },
        { id: 2, reference: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo.", summary: "Lorem ipsum dolor sit amet, consectetuer adipiscing el.", rating: " " },
        { id: 3, reference: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.", summary: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit", rating: "" },
        { id: 4, reference: "تمثیلی خیالی از دیدار جهانگیرشاه (پادشاه ایران صفوی) اثر ابوالحسن و در سبک نگارگری گورکانی. در حالی که شاه عباس بر سر بزی ایستاده است", summary: "مثیلی خیالی ا. در حالی که شاه عباس بر سر بزی ایستاده است", rating: "" },
    ];

return (
    <div>
        
        <table border="1" style={{ borderCollapse: "collapse", width: "90%" }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Reference</th>
                    <th>Summary</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.reference}</td>
                        <td>{row.summary}</td>
                        <td>{<Rating />}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
  } export default Summarization;