// 'use client'; 
// import apiRequest from '@/lib/apiService';
// import { useSearchParams } from 'next/navigation';
// import { Button } from 'rizzui';

// interface AssignButtonProps {

//   title: string
// }


// const handleAssign = ()=>{
//     const searchParams = useSearchParams()
//     const transactionId = searchParams.get('requestId')

//     const assignAssetIdstoTransaction = async () => {
//       try {
//         const updatedTransaction = await apiRequest({
//           method: 'PATCH',
//           endpoint: `/transactions/${transactionId}`,
//           data: {
//             metadata: {
//             bookedRequests: selectedRowIds
//           }}
//         });
  
  
//         return updatedTransaction;
//       } catch (error) {
//         console.error('Failed to fetch transaction details:', error);
//         return null;
//       }
//     };
  
//   }

// const SubmitHandlerButton: React.FC<AssignButtonProps> = ({ title}) => {
//   return (
//     <div className="mt-6">
//       <Button onClick={handleAssign}>{title}</Button>
//     </div>
//   );
// };

// export default SubmitHandlerButton;
