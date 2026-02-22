import { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";
import ScanOverlay from "@/components/ScanOverlay";
import { analyzeSkin, SkinMetrics } from "@/lib/skinAnalysis";

const ScanPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<SkinMetrics | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const navigate = useNavigate();

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 640 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setCameraError(false);
    } catch {
      setCameraError(true);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    // Simulate analysis time
    setTimeout(() => {
      const metrics = analyzeSkin();
      setResult(metrics);
      setScanning(false);
      // Store in sessionStorage for dashboard
      const history = JSON.parse(sessionStorage.getItem("skinlet-scans") || "[]");
      history.push({ id: Date.now().toString(), date: new Date().toISOString(), metrics });
      sessionStorage.setItem("skinlet-scans", JSON.stringify(history));
      sessionStorage.setItem("skinlet-latest", JSON.stringify(metrics));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold mb-2">Skin Scan</h1>
          <p className="text-muted-foreground">Position your face within the oval guide</p>
        </motion.div>

        {/* Camera viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-elevated bg-muted mb-6"
        >
          {cameraError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
              <Camera size={48} className="text-muted-foreground" />
              <p className="text-muted-foreground text-center text-sm">
                Camera access is required. Please allow camera permissions and refresh.
              </p>
              <button
                onClick={startCamera}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-2xl text-sm font-medium"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
                style={{ transform: "scaleX(-1)" }}
              />
              <ScanOverlay scanning={scanning} />
            </>
          )}
        </motion.div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          {!result ? (
            <button
              onClick={handleScan}
              disabled={scanning || cameraError}
              className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-glass hover:shadow-elevated transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {scanning ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Camera size={20} />
                  Scan My Skin
                </>
              )}
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full glass rounded-3xl p-6 shadow-elevated text-center"
              >
                <CheckCircle2 size={40} className="text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold text-2xl mb-1">
                  SkinletScore: {result.skinletScore}
                </h3>
                <p className="text-muted-foreground text-sm mb-1">
                  Skin Type: {result.skinType}
                </p>
                <p className="text-xs text-muted-foreground mb-5">
                  Concerns: {result.concerns.join(", ")}
                </p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-muted rounded-2xl p-3">
                    <p className="text-xs text-muted-foreground">Acne</p>
                    <p className="font-display font-bold text-lg">{result.acneCount}</p>
                  </div>
                  <div className="bg-muted rounded-2xl p-3">
                    <p className="text-xs text-muted-foreground">Oil %</p>
                    <p className="font-display font-bold text-lg">{result.oilPercentage}</p>
                  </div>
                  <div className="bg-muted rounded-2xl p-3">
                    <p className="text-xs text-muted-foreground">Redness</p>
                    <p className="font-display font-bold text-lg">{result.rednessLevel}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setResult(null)}
                    className="flex-1 glass text-foreground px-4 py-3 rounded-2xl font-medium text-sm"
                  >
                    Scan Again
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-2xl font-medium text-sm"
                  >
                    View Dashboard
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScanPage;
