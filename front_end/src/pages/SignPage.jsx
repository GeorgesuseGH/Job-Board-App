import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    const navigate=useNavigate()
    const postData = (url, data) => {
        axios.post(url, data, { withCredentials: true }).then(res => {
            if (res) {
               navigate("/log-in",{replace:true})
            }
        }).catch(err => console.log(err))
    }
const formData=new FormData()

    return (<>
        <div className=" my-40 flex flex-col gap-10 items-center justify-center shadow-xl shadow-2xl border-2 w-[80%] h-[80%] justify-self-center">
            <h1 className="text-2xl font-serif my-15 text-red-700">Sign-up page </h1>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
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
formData.append("birthdate",birthdate)
}
axios.post("http://localhost:5000/api/signup",formData, { withCredentials: true })
               navigate("/log-in",{replace:true})

                }}>
                    <div className="my-10 border-red-300 grid sm:grid-cols-1 md:grid-cols-2  gap-10 font-sans">

                        <label >Email : <input minlength="10"
  maxlength="30" className=" rounded-md border-3 " required type="email" value={email} onChange={(e) => {

                            setEmail(e.target.value)
                        }}></input></label>
                        <label>Password : <input minlength="10"
  maxlength="18" className=" rounded-md border-3 " required type="password" value={pass} onChange={(e) => {


                            setPass(e.target.value)
                        }}></input></label>
                        <label>First-name : <input minlength="2"
  maxlength="50" className=" rounded-md border-3 " type="text" value={firstName} required onChange={(e) => {

                            setFirstName(e.target.value)
                        }}></input></label>
                        <label>Last-name : <input minlength="2"
  maxlength="50" className=" rounded-md border-3 " type="text" value={lastName} required onChange={(e) => {


                            setLastName(e.target.value)
                        }}></input></label>
                        <label>
                            Country : <select className="border-2 rounded-md" required onChange={(e) => setCountry(e.target.value)} value={country}>

                                <option value="" disabled>Select a country</option>
                                {countries.map(country => {
                                    return <option key={country.country}>{country.country}</option>
                                })}</select>
                        </label>
                        <label className="">Phone : <select className="border-2 rounded-md" required onChange={(e) => setPhoneCode(e.target.value)} value={phoneCode}>
                            {countries.map(country => {
                                return <option key={country.country}>{country.code}</option>
                            })}</select><input minlength="5"
  maxlength="20" className=" rounded-md border-3 " type="number" value={phone} required onChange={(e) => {


                                setPhone(e.target.value)
                            }}></input></label>

                        <label>Signing up as Employer ? <input className=" rounded-md border-3 " type="checkbox" checked={isemployer} onChange={(e) => {
                            setBirthdate("")
                            setCompany("")
                            setIsemployer(!isemployer)
                        }}></input></label>
                        <label hidden={!isemployer}>Company :<input minlength="2"
  maxlength="50" className=" rounded-md border-3" type="text" value={company} required={isemployer} onChange={(e) => {
                            setCompany(e.target.value)
                        }} ></input>
                        </label>
                        <label hidden={!isemployer}>Profile photo :<input className=" rounded-md border-3" type="file"  required={isemployer} onChange={(e) => {
                            setImage(e.target.files[0])

                        }} ></input>
                        </label>
                        <label hidden={isemployer}>Birthdate : <input className=" rounded-md border-3" type="date" value={birthdate} required={!isemployer} onChange={(e) => {
                            setBirthdate(e.target.value)
                        }} ></input>
                        </label></div>
                    <div className="flex justify-center my-10">
                        <button type="submit" className="bg-gradient-to-tl from-primary via-secondary to-primary border-2 rounded-md w-30 justify-center hover:shadow-blue-300 hover:shadow-xl hover:font-semibold">Submit</button>
                    </div> </form>

            </div>
        </div>
    </>
    )
}