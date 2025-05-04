import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Flower } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    
    try {
      // Demo login - normally would validate with backend
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Demo login handling
  const handleDemoLogin = () => {
    setEmail('demo@blossomdesk.com');
    setPassword('password123');
    login('demo@blossomdesk.com', 'password123');
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme}`}>
      {/* Brand/intro section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-secondary text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-md text-primary mr-3">
              <Flower size={20} />
            </div>
            <h1 className="text-2xl font-bold">BlossomDesk</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to your agency workspace</h2>
          <p className="text-white/80 text-lg mb-8 max-w-md">
            Seamlessly manage projects, collaborate with clients, and deliver exceptional results with BlossomDesk.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Streamlined workflow</h3>
                <p className="text-white/70 text-sm">Everything you need in one place - from briefs to approvals</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16 16-4-4V6" /></svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Real-time collaboration</h3>
                <p className="text-white/70 text-sm">Work together with your team and clients in real-time</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path d="m7 21 5-5 5 5" /></svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Insightful reporting</h3>
                <p className="text-white/70 text-sm">Data-driven insights to optimize your campaigns</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative mt-12 text-white/70 text-sm z-10">
          © {new Date().getFullYear()} BlossomDesk. All rights reserved.
        </div>
      </div>
      
      {/* Login form section */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-end mb-8">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {theme === 'dark' ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
              }
            </button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Sign in to BlossomDesk</h2>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} className="text-gray-500" /> : <Eye size={18} className="text-gray-500" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-primary hover:text-primary/80">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign in'}
            </button>
            
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative px-4 bg-background text-sm text-gray-500 dark:text-gray-400">
                Or continue with
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn-outline w-full"
            >
              Demo Account (One Click Login)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;