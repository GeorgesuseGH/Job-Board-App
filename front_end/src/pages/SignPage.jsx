import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const studiesLevels=[
    'Associate degree',
'Bachelors degree',
'Masters degree',
'Doctoral degree','other'
]
const countries = [
    { country: "Lebanon", code: "+961" },
    { country: "United States", code: "+1" },
    { country: "Canada", code: "+1" },
    { country: "United Kingdom", code: "+44" },
    { country: "France", code: "+33" },
    { country: "Germany", code: "+49" },
    { country: "Italy", code: "+39" },
    { country: "Spain", code: "+34" },
    { country: "Turkey", code: "+90" },
    { country: "Saudi Arabia", code: "+966" },
    { country: "United Arab Emirates", code: "+971" },
    { country: "Qatar", code: "+974" },
    { country: "Kuwait", code: "+965" },
    { country: "Egypt", code: "+20" },
    { country: "Jordan", code: "+962" },
    { country: "Syria", code: "+963" },
    { country: "Iraq", code: "+964" },
    { country: "Australia", code: "+61" },
    { country: "India", code: "+91" },
    { country: "China", code: "+86" },
    { country: "Japan", code: "+81" },
    { country: "South Korea", code: "+82" },
    { country: "Brazil", code: "+55" },
    { country: "Mexico", code: "+52" },
    { country: "South Africa", code: "+27" }
];
export function SignPage() {
  
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [isemployer, setIsemployer] = useState(false)
    const [phoneCode, setPhoneCode] = useState('')
    const [company, setCompany] = useState("")
    const [image, setImage] = useState('')
    const [birthdate, setBirthdate] = useState("")
    const [experience,setExperience]=useState('')
    const [customStudies, setCustomStudies] = useState("")
    const [studies,setStudies]=useState("")
    const navigate=useNavigate()


    return (<>
        <div className=" my-40 flex flex-col gap-10 items-center justify-center shadow-xl shadow-2xl border-2 w-[80%] h-[80%] justify-self-center">
            <h1 className="text-2xl font-serif my-15 text-red-700">Sign-up page </h1>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData=new FormData()

                    formData.append("email",email)
                    formData.append("pass",pass)
                     formData.append("firstName",firstName)
                      formData.append("phone",`${phoneCode}${phone}`)
                       formData.append("lastName",lastName)
                        formData.append("country",country)
                         formData.append("isemployer",isemployer)


if(isemployer){
formData.append("company",company)
formData.append("image",image)

}
else{
    formData.append("experience",experience)
    if(studies==="other"){
        formData.append("studies",customStudies)
    }
    else{
         formData.append("studies",studies)
    }
   
formData.append("birthdate",birthdate)
}
axios.post("http://localhost:5000/api/signup",formData, { withCredentials: true }).then(res=>{
    if(res.data.success){
        navigate("/log-in",{replace:true})
    }
    else{
      navigate("/error",{replace:true})
    }
}).catch(err=>{
          navigate("/error",{replace:true})

})
              

                }}>
                    <div className="my-10 border-red-300 grid sm:grid-cols-1 md:grid-cols-2  gap-10 font-sans">

                        <label >Email : <input minLength="10"
  maxLength="30" className="p-3 rounded-md border-3 " required type="email" value={email} onChange={(e) => {

                            setEmail(e.target.value)
                        }}></input></label>
                        <label>Password : <input minLength="10"
  maxLength="18" className="p-3  rounded-md border-3 " required type="password" value={pass} onChange={(e) => {


                            setPass(e.target.value)
                        }}></input></label>
                        <label>First-name : <input minLength="2"
  maxLength="50" className="p-3  rounded-md border-3 " type="text" value={firstName} required onChange={(e) => {

                            setFirstName(e.target.value)
                        }}></input></label>
                        <label>Last-name : <input minLength="2"
  maxLength="50" className="p-3  rounded-md border-3 " type="text" value={lastName} required onChange={(e) => {


                            setLastName(e.target.value)
                        }}></input></label>
                        <label>
                            Country : <select required className="border-2 rounded-md p-3 " required onChange={(e) => setCountry(e.target.value)} value={country}>

                                <option value="" disabled>Select a country</option>
                                {countries.map(country => {
                                    return <option key={country.country}>{country.country}</option>
                                })}</select>
                        </label>
                        <label className="">Phone : <select required className="border-2 rounded-md p-3 " required onChange={(e) => setPhoneCode(e.target.value)} value={phoneCode}>
                            <option disabled value="">Select</option>
                            {countries.map(country => {
                                return <option key={country.country}>{country.code}</option>
                            })}</select><input minLength="5"
  maxLength="20" className=" rounded-md border-3 p-3 " type="number" value={phone} required onChange={(e) => {


                                setPhone(e.target.value)
                            }}></input></label>

                        <label>Signing up as Employer ? <input className=" rounded-md border-3 p-3 " type="checkbox" checked={isemployer} onChange={(e) => {
                           setBirthdate("")
  setCompany("")
  setImage('')
  setExperience('')
  setStudies('')
  setIsemployer(!isemployer)
                        }}></input></label>
                        <label hidden={!isemployer}>Company :<input minLength="2"
  maxLength="50" className="p-3  rounded-md border-3" type="text" value={company} required={isemployer} onChange={(e) => {
                            setCompany(e.target.value)
                        }} ></input>
                        </label>
                        <label hidden={!isemployer}>Profile photo :<input className="p-3  rounded-md border-3" type="file"  required={isemployer} onChange={(e) => {
                            setImage(e.target.files[0])

                        }} placeholder="Choose File" ></input>
                        </label>
                        <label hidden={isemployer}>Birthdate : <input className="p-3  rounded-md border-3" type="date" value={birthdate} required={!isemployer} onChange={(e) => {
                            setBirthdate(e.target.value)
                        }} ></input>
                        </label>
                        
                        <label hidden={isemployer} className="flex flex-row gap-2 items-center justify-center">Experience :<textarea  minLength="40"
  maxLength="350"  className="border-1 rounded-xl p-3 " required={!isemployer} value={experience} placeholder="Worked as a DevOps in ..." onChange={e => {
                setExperience(e.target.value)
              }}></textarea></label>
              <label className="flex flex-row items-center justify-center" hidden={isemployer}>Level of degree:
                <select value={studies} required={!isemployer} onChange={e=>{
                    setStudies(e.target.value)
                }} className="border-2 rounded-xl p-3 ">
<option value="" disabled >Select a Level degree</option>
                
               { studiesLevels.map(level=>
                   <option key={level}>{level}</option>
                )}</select>
              
              </label>  
                   {studies=="other"&&<label hidden={isemployer}>Other type of studies <input required={!isemployer}   value={customStudies} type="text" onChange={(e)=>{
                    setCustomStudies(e.target.value)
                   }}></input></label>
                   }
                        </div>
                    <div className="flex justify-center my-10">
                        <button type="submit" className=" bg-gradient-to-tl from-primary via-secondary to-primary border-2 rounded-md w-30 justify-center hover:shadow-blue-300 hover:shadow-xl hover:font-semibold">Submit</button>
                    </div> </form>

            </div>
        </div>
    </>
    )
}