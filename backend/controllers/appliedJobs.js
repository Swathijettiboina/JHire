const supabase = require('../config/connectDb');

const updateApplicationStatus = async (req, res) => {
    const { application_status } = req.body;
    const { application_id } = req.params;  // Fix: Use req.params instead of req.param

    try {
        const { data, error } = await supabase
            .from('applied_jobs')
            .update({ application_status })
            .eq('application_id', application_id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json({ message: 'Application status updated successfully', data });

    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

module.exports = { updateApplicationStatus };
